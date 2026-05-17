const { createMollieClient } = require('@mollie/api-client');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    const studentName = body.studentName || 'Student';
    const orderRef    = body.orderRef    || 'ES-000';
    const amount      = body.amount      || '45.00';
    const email       = body.email       || '';
    const school      = body.school      || '';
    const colour      = body.colour      || 'Black';
    const size        = body.size        || '';
    const quantity    = body.quantity    || 1;

    console.log('Creating payment:', { studentName, orderRef, amount, email, size, quantity });

    const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY });

    const payment = await mollie.payments.create({
      amount: {
        currency: 'EUR',
        value:    String(amount),
      },
      description:  `Endless Studios — Graduation Hoodie (${colour}) — ${studentName} — ${orderRef}`,
      redirectUrl:  'https://www.endless-studio.eu/thank-you.html',
      webhookUrl:   'https://www.endless-studio.eu/api/payment-webhook',
      metadata: {
        studentName,
        orderRef,
        email,
        school,
        colour,
        size,
        quantity: String(quantity),
        amount:   String(amount),
      },
    });

    console.log('Payment created:', payment.id);
    const checkoutUrl = payment._links?.checkout?.href || payment.getCheckoutUrl?.();
    return res.status(200).json({ checkoutUrl });

  } catch (err) {
    console.error('Error:', err.message, err.stack);
    return res.status(500).json({ error: err.message });
  }
};
