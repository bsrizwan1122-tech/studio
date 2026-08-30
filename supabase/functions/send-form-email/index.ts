// Supabase Edge Function: send-form-email
// Deploy with: supabase functions deploy send-form-email
// Set secrets with: supabase secrets set GMAIL_USER=... GMAIL_APP_PASSWORD=... NOTIFY_EMAIL=... ALLOWED_ORIGIN=...
// Secrets are stored by Supabase, never in this file or your git repo.

import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const ALLOWED_ORIGIN = Deno.env.get("ALLOWED_ORIGIN") || "*";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const FORM_SUBJECTS: Record<string, string> = {
  contact: "New Contact Message",
  wordpress: "New Order: WordPress Development",
  "data-entry": "New Order: Data Entry",
  "video-editing": "New Order: Video Editing",
  "ai-creation": "New Order: AI Creation",
};

function sanitize(v: unknown): string {
  return String(v ?? "").replace(/[\r\n]+/g, " ").trim();
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const url = new URL(req.url);
    // form type passed as ?form=contact | wordpress | data-entry | video-editing | ai-creation
    const formType = url.searchParams.get("form") || "contact";
    const subjectLabel = FORM_SUBJECTS[formType] || "New Website Submission";

    const body = await req.json();
    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(body)) {
      fields[key] = sanitize(value);
    }

    if (!fields.name || !fields.email) {
      return new Response(JSON.stringify({ error: "Name and email are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const gmailUser = Deno.env.get("GMAIL_USER");
    const gmailPass = Deno.env.get("GMAIL_APP_PASSWORD");
    const notifyEmail = Deno.env.get("NOTIFY_EMAIL") || gmailUser;

    if (!gmailUser || !gmailPass) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD secret");
      return new Response(JSON.stringify({ error: "Server not configured." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: { username: gmailUser, password: gmailPass },
      },
    });

    const bodyText = Object.entries(fields)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    await client.send({
      from: gmailUser,
      to: notifyEmail,
      replyTo: fields.email,
      subject: `${subjectLabel} — ${fields.name}`,
      content: bodyText,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-form-email error:", err);
    return new Response(JSON.stringify({ error: "Failed to send. Please try again later." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
