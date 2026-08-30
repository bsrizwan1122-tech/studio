// Shared form-submission handler for all Studio site forms.
const BACKEND_URL = window.STUDIO_BACKEND_URL || 'https://rfjksupbwhgtkobljgya.supabase.co/functions/v1/send-form-email';
// Supabase Edge Functions require an anon/public API key header by default.
// This is your project's PUBLIC anon key — safe to expose in client-side code,
// unlike the Gmail app password. Set it once you have it from
// Supabase Dashboard → Project Settings → API → "anon public" key.
const SUPABASE_ANON_KEY = window.STUDIO_SUPABASE_ANON_KEY || 'sb_publishable_FdZR4YMiI9LkYkZCaPIdgQ_7qh2ONiv';

async function submitStudioForm(form, formType, { redirectTo, successMessage } = {}) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.textContent : null;

  const data = {};
  new FormData(form).forEach((value, key) => { data[key] = value; });

  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    const res = await fetch(`${BACKEND_URL}?form=${encodeURIComponent(formType)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || 'Submission failed.');
    }

    alert(successMessage || 'Thanks! We will get back to you shortly.');
    form.reset();
    if (redirectTo) window.location.href = redirectTo;
  } catch (err) {
    alert('Sorry, something went wrong sending your message. Please try again or email us directly.');
    console.error(err);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}
