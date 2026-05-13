// ═══════════════════════════════════════════════════════
//  ENDLESS STUDIOS — Mollie Payment Creator
//  Vercel Serverless Function — /api/create-payment.js
//
//  Set this in Vercel Dashboard → Settings → Environment Variables:
//    MOLLIE_API_KEY = live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// ═══════════════════════════════════════════════════════

const { createMollieClient } = require('@mollie/api-client');

module.exports = async (req, res) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS — allow your site to call this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { studentName, orderRef, school, size, email, amount } = req.body;

    if (!studentName || !orderRef || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

    const payment = await mollie.payments.create({
      amount: {
        currency: 'EUR',
        value: amount, // e.g. "45.00"
      },
      description: `Endless Studios — Graduation Hoodie — ${studentName} — ${orderRef}`,
      redirectUrl: `https://www.endless-studio.eu/student-portal.html?status=paid&ref=${orderRef}`,
      webhookUrl:  `https://www.endless-studio.eu/api/payment-webhook`,
      method:      'ideal',
      metadata: {
        studentName,
        orderRef,
        school,
        size,
        email,
      },
    });

    // Return the Mollie checkout URL to the frontend
    return res.status(200).json({ checkoutUrl: payment.getCheckoutUrl() });

  } catch (err) {
    console.error('Mollie error:', err);
    return res.status(500).json({ error: err.message });
  }
};
