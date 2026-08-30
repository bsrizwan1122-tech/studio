require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// CORS: restrict to your live site domain(s). Update ALLOWED_ORIGINS in your
// hosting platform's env vars (comma-separated), e.g.
// ALLOWED_ORIGINS=https://bsrizwan1122-tech.github.io,https://yourdomain.com
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

// Basic rate limiting to prevent abuse of your inbox/quota
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: 'Too many submissions, please try again later.' }
});
app.use('/api/', formLimiter);

// Gmail transporter — credentials come ONLY from environment variables,
// set in your hosting platform's dashboard (Render/Railway/Vercel/etc),
// never committed to git.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,       // e.g. hello@yourdomain.com / your gmail address
    pass: process.env.GMAIL_APP_PASSWORD // 16-char app password, no spaces
  }
});

// Very small helper to strip anything that looks like header injection
function sanitize(str = '') {
  return String(str).replace(/[\r\n]+/g, ' ').trim();
}

function buildMailOptions({ subject, fields }) {
  const body = Object.entries(fields)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  return {
    from: `"Studio Website" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.GMAIL_USER,
    replyTo: fields.email ? sanitize(fields.email) : undefined,
    subject: sanitize(subject),
    text: body
  };
}

async function handleForm(req, res, subjectPrefix) {
  try {
    const fields = {};
    for (const [key, value] of Object.entries(req.body || {})) {
      fields[key] = sanitize(value);
    }

    if (!fields.name || !fields.email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const mailOptions = buildMailOptions({
      subject: `${subjectPrefix} — ${fields.name}`,
      fields
    });

    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error('Mail send error:', err.message);
    res.status(500).json({ error: 'Failed to send. Please try again later.' });
  }
}

app.post('/api/contact', (req, res) => handleForm(req, res, 'New Contact Message'));
app.post('/api/apply/wordpress', (req, res) => handleForm(req, res, 'New Order: WordPress Development'));
app.post('/api/apply/data-entry', (req, res) => handleForm(req, res, 'New Order: Data Entry'));
app.post('/api/apply/video-editing', (req, res) => handleForm(req, res, 'New Order: Video Editing'));
app.post('/api/apply/ai-creation', (req, res) => handleForm(req, res, 'New Order: AI Creation'));

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Forms backend listening on port ${PORT}`));
