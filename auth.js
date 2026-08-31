// Shared authentication helper using Supabase Auth.
// The publishable key below is safe for client-side use (like an API's public key).
const SUPABASE_URL = 'https://rfjksupbwhgtkobljgya.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_FdZR4YMiI9LkYkZCaPIdgQ_7qh2ONiv';

// Loaded via CDN script tag on each page before this file.
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function getCurrentUser() {
  const { data } = await supabaseClient.auth.getSession();
  return data.session ? data.session.user : null;
}

async function signUpWithEmail(name, email, password) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } }
  });
  if (error) throw error;
  return data;
}

async function signInWithEmail(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function signInWithProvider(provider) {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider,
    options: { redirectTo: window.location.origin + '/account.html' }
  });
  if (error) throw error;
}

async function signOutUser() {
  await supabaseClient.auth.signOut();
  window.location.href = 'index.html';
}

// Updates any "auth-nav-slot" elements on the page to reflect logged-in/out state.
async function renderAuthNav() {
  const slots = document.querySelectorAll('.auth-nav-slot');
  if (!slots.length) return;

  const user = await getCurrentUser();

  slots.forEach((slot) => {
    if (user) {
      const name = (user.user_metadata && user.user_metadata.full_name) || user.email;
      slot.innerHTML = `
        <a href="account.html" class="hover:text-gold transition text-sm text-gray-300">
          <i class="fas fa-user-circle mr-1"></i>${name.split(' ')[0]}
        </a>
      `;
    } else {
      slot.innerHTML = `
        <a href="login.html" class="hover:text-gold transition text-sm text-gray-400">Login</a>
      `;
    }
  });
}

document.addEventListener('DOMContentLoaded', renderAuthNav);
