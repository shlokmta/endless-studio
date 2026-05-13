// ═══════════════════════════════════════════════════════
//  ENDLESS STUDIOS — Mollie Payment Server
//  Express + @mollie/api-client
//  Deploy on Vercel — reads MOLLIE_API_KEY from env vars
// ═══════════════════════════════════════════════════════

require('dotenv').config(); // loads .env locally (ignored on Vercel — use dashboard)

const express    = require('express');
const { createMollieClient } = require('@mollie/api-client');
const path       = require('path');

const app    = express();
const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

// ── Middleware ──────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve your static HTML files from the same folder
app.use(express.static(path.join(__dirname)));

// ── CORS (allows your frontend to call the API) ─────────
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});


// ═══════════════════════════════════════════════════════
//  ENDPOINT 1 — POST /api/create-payment
//  Called by the student portal when they click Pay
// ═══════════════════════════════════════════════════════
app.post('/api/create-payment', async (req, res) => {
  try {
    const {
      studentName = 'Unknown Student',
      orderRef    = 'ES-000',
      school      = 'Unknown School',
      size        = '—',
      email       = '',
      amount      = '45.00',
    } = req.body;

    const payment = await mollie.payments.create({
      amount: {
        currency: 'EUR',
        value:    amount, // must be a string like "45.00"
      },
      description: `Endless Studios — Graduation Hoodie — ${studentName} — ${orderRef}`,
      redirectUrl: `https://www.endless-studio.eu/student-portal.html?status=paid&ref=${orderRef}`,
      webhookUrl:  `https://www.endless-studio.eu/api/webhook`,
      method:      'ideal',
      metadata: {
        studentName,
        orderRef,
        school,
        size,
        email,
      },
    });

    console.log(`[CREATE] Payment created: ${payment.id} for ${studentName} (${orderRef})`);

    // Send the Mollie checkout URL back to the browser
    return res.status(200).json({ checkoutUrl: payment.getCheckoutUrl() });

  } catch (err) {
    console.error('[CREATE] Mollie error:', err.message);
    return res.status(500).json({ error: err.message });
  }
});


// ═══════════════════════════════════════════════════════
//  ENDPOINT 2 — POST /api/webhook
//  Mollie calls this automatically after every payment
//  status change (paid, failed, expired, cancelled)
// ═══════════════════════════════════════════════════════
app.post('/api/webhook', async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      console.warn('[WEBHOOK] No payment ID received');
      return res.status(400).send('Missing payment ID');
    }

    // Fetch the full payment object from Mollie to get the real status
    const payment = await mollie.payments.get(id);

    const { studentName, orderRef, school, size, email } = payment.metadata || {};

    console.log(`[WEBHOOK] Payment ${id} — status: ${payment.status}`);
    console.log(`          Student: ${studentName} | Order: ${orderRef} | School: ${school} | Size: ${size}`);

    if (payment.status === 'paid') {
      console.log(`✅ PAID — €${payment.amount.value} received from ${studentName} (${orderRef})`);
      // ── Extend here: update Google Sheet, send email, etc. ──
    }

    if (payment.status === 'failed' || payment.status === 'canceled') {
      console.log(`❌ ${payment.status.toUpperCase()} — ${studentName} (${orderRef})`);
    }

    // Always return 200 — Mollie retries if it doesn't get 200
    return res.status(200).send('OK');

  } catch (err) {
    console.error('[WEBHOOK] Error:', err.message);
    return res.status(500).send('Error');
  }
});


// ── Start server (local development only) ───────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Endless Studios server running on http://localhost:${PORT}`);
});

module.exports = app; // required for Vercel
