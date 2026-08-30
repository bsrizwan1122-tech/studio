// Supabase Edge Function: send-form-email
// Deploy with: supabase functions deploy quick-worker
// Set secrets with: supabase secrets set RESEND_API_KEY=... NOTIFY_EMAIL=... ALLOWED_ORIGIN=...
// Secrets are stored by Supabase, never in this file or your git repo.
//
// Uses Resend's HTTPS API instead of raw SMTP, because many edge/serverless
// runtimes (including Supabase Edge Functions) only allow outbound HTTPS,
// not raw SMTP socket connections — which is why direct Gmail SMTP send
// can silently fail to deliver even when the function itself doesn't error.

import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

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

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const notifyEmail = Deno.env.get("NOTIFY_EMAIL");

    if (!resendApiKey || !notifyEmail) {
      console.error("Missing RESEND_API_KEY or NOTIFY_EMAIL secret");
      return new Response(JSON.stringify({ error: "Server not configured." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const bodyHtml = Object.entries(fields)
      .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
      .join("");

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Studio Website <onboarding@resend.dev>",
        to: [notifyEmail],
        reply_to: fields.email,
        subject: `${subjectLabel} — ${fields.name}`,
        html: bodyHtml,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend API error:", resendRes.status, errText);
      return new Response(JSON.stringify({ error: "Failed to send. Please try again later." }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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

