// ═══════════════════════════════════════════════════════
//  ENDLESS STUDIO — Mollie: create payment
//  Vercel serverless function  →  POST /api/create-payment
//
//  Creates a Mollie payment server-side (dynamic amount) and
//  returns the hosted-checkout URL. The API key lives ONLY in
//  the MOLLIE_API_KEY environment variable — never client-side.
// ═══════════════════════════════════════════════════════

const BASE = "https://www.endless-studio.eu"; // production domain (redirect + webhook base)

module.exports = async (req, res) => {
  // CORS (same-origin calls; kept permissive for safety)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST")   { res.status(405).json({ error: "Method not allowed" }); return; }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const {
      studentName = "—",
      orderRef    = "ES-000",
      school      = "Endless Studio",
      product     = "",
      colour      = "—",
      size        = "—",
      quantity    = 1,
      email       = "",
      amount      = "0.00",
    } = body;

    // Mollie requires the amount as a string with exactly 2 decimals
    const value = Number(amount).toFixed(2);
    if (!(Number(value) > 0)) { res.status(400).json({ error: "Invalid amount" }); return; }

    const mollieRes = await fetch("https://api.mollie.com/v2/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MOLLIE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount:      { currency: "EUR", value },
        description: `${school}${product ? " – " + product : ""} (${orderRef})`,
        redirectUrl: `${BASE}/thank-you.html?ref=${encodeURIComponent(orderRef)}`,
        webhookUrl:  `${BASE}/api/webhook`,
        method:      "ideal",
        metadata: {
          orderRef, studentName, email, school,
          product, colour, size,
          quantity: String(quantity),
          amount: value,
        },
      }),
    });

    const payment = await mollieRes.json();
    if (!mollieRes.ok) {
      console.error("[create-payment] Mollie error:", payment);
      res.status(502).json({ error: payment.detail || "Mollie payment failed" });
      return;
    }

    res.status(200).json({ checkoutUrl: payment._links.checkout.href });
  } catch (err) {
    console.error("[create-payment] error:", err);
    res.status(500).json({ error: err.message });
  }
};
