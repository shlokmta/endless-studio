// ═══════════════════════════════════════════════════════
//  ENDLESS STUDIOS — Mollie Payment Webhook
//  Vercel Serverless Function — /api/payment-webhook.js
//
//  Mollie POSTs here on every payment status change.
//  On 'paid': reads metadata → logs row to Google Sheets.
// ═══════════════════════════════════════════════════════

const { createMollieClient } = require('@mollie/api-client');
const https = require('https');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const id   = body.id;

    if (!id) return res.status(400).send('No payment ID');

    const mollie  = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });
    const payment = await mollie.payments.get(id);

    console.log(`Payment ${id} — status: ${payment.status}`);

    if (payment.status === 'paid') {
      const meta  = payment.metadata || {};
      const row = {
        timestamp:    new Date().toISOString(),
        order_ref:    meta.orderRef    || id,
        student_name: meta.studentName || '—',
        email:        meta.email       || '—',
        school:       meta.school      || '—',
        size:         meta.size        || '—',
        quantity:     meta.quantity    || '1',
        amount:       '€' + (payment.amount?.value || meta.amount || '0.00'),
        payment_id:   id,
        status:       'PAID',
      };

      console.log('✓ PAID —', row.student_name, '—', row.order_ref);

      // Log to Google Sheets via Apps Script Web App
      const sheetsUrl = process.env.SHEETS_URL;
      if (sheetsUrl) {
        await postToSheets(sheetsUrl, row);
        console.log('Sheet updated ✓');
      } else {
        console.warn('SHEETS_URL env var not set — skipping sheet log');
      }
    }

    return res.status(200).send('OK');

  } catch (err) {
    console.error('Webhook error:', err.message, err.stack);
    return res.status(500).send('Error');
  }
};

// ─── Lightweight HTTPS POST to Google Apps Script ───
function postToSheets(url, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const urlObj  = new URL(url);

    const options = {
      hostname: urlObj.hostname,
      path:     urlObj.pathname + urlObj.search,
      method:   'POST',
      headers:  {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, res => {
      res.on('data', () => {});
      res.on('end', resolve);
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}
