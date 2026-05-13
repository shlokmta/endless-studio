// ═══════════════════════════════════════════════════════
//  ENDLESS STUDIOS — Mollie Payment Webhook
//  Vercel Serverless Function — /api/payment-webhook.js
//
//  Mollie calls this URL after every payment status change.
//  You can extend this to update your Google Sheet automatically.
// ═══════════════════════════════════════════════════════

const { createMollieClient } = require('@mollie/api-client');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  try {
    const { id } = req.body; // Mollie sends the payment ID

    if (!id) return res.status(400).send('No payment ID');

    const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });
    const payment = await mollie.payments.get(id);

    console.log(`Payment ${id} — status: ${payment.status}`);
    console.log('Metadata:', payment.metadata);

    // Payment statuses: paid, failed, canceled, expired, pending
    if (payment.status === 'paid') {
      console.log(`✓ PAID — ${payment.metadata.studentName} — ${payment.metadata.orderRef}`);
      // TODO: you could update your Google Sheet here automatically
    }

    // Always return 200 so Mollie knows we received it
    return res.status(200).send('OK');

  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).send('Error');
  }
};
