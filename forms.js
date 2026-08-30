// Shared form-submission handler for all Studio site forms.
// Set your Supabase project's function URL below once deployed, e.g.
// https://YOUR-PROJECT-REF.supabase.co/functions/v1/send-form-email
const BACKEND_URL = window.STUDIO_BACKEND_URL || 'https://YOUR-PROJECT-REF.supabase.co/functions/v1/send-form-email';

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
      headers: { 'Content-Type': 'application/json' },
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
