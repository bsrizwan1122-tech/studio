// Shared form-submission handler for all Studio site forms.
// Uses Web3Forms — a hosted form-to-email service. This access key is
// designed to be public/client-side (unlike API secrets or app passwords).
const WEB3FORMS_ACCESS_KEY = '27626821-713c-4a60-aa43-660d2f34492c';

const FORM_SUBJECTS = {
  contact: 'New Contact Message',
  wordpress: 'New Order: WordPress Development',
  'data-entry': 'New Order: Data Entry',
  'video-editing': 'New Order: Video Editing',
  'ai-creation': 'New Order: AI Creation',
};

async function submitStudioForm(form, formType, { redirectTo, successMessage } = {}) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.textContent : null;

  const data = {};
  new FormData(form).forEach((value, key) => { data[key] = value; });

  data.access_key = WEB3FORMS_ACCESS_KEY;
  data.subject = FORM_SUBJECTS[formType] || 'New Website Submission';
  data.from_name = 'Studio Website';

  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!result.success) {
      throw new Error(result.message || 'Submission failed.');
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
