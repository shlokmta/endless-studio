// ═══════════════════════════════════════════════════════
//  ENDLESS STUDIO — Mollie: payment webhook
//  Vercel serverless function  →  POST /api/webhook
//
//  Mollie POSTs a payment id here on every status change.
//  We fetch the payment, and ONLY when status === "paid" do we
//  fulfil: log the order to Google Sheets + send a confirmation
//  email. Idempotent — the Sheet dedupes by payment id, and the
//  email is only sent when a NEW row was inserted, so repeated
//  Mollie calls never double-send.
// ═══════════════════════════════════════════════════════

module.exports = async (req, res) => {
  // Always answer POSTs with 200 quickly so Mollie doesn't retry-storm.
  if (req.method !== "POST") { res.status(200).send("OK"); return; }

  try {
    // Mollie sends application/x-www-form-urlencoded: id=tr_xxxx
    let id;
    if (req.body && typeof req.body === "object") id = req.body.id;
    else if (typeof req.body === "string") id = new URLSearchParams(req.body).get("id");
    if (!id) { res.status(400).send("Missing payment id"); return; }

    const payRes = await fetch(`https://api.mollie.com/v2/payments/${id}`, {
      headers: { Authorization: `Bearer ${process.env.MOLLIE_API_KEY}` },
    });
    const payment = await payRes.json();

    if (payment.status === "paid") {
      const m = payment.metadata || {};
      let inserted = true;

      // ── 1) Log the confirmed order to Google Sheets ──
      if (process.env.GOOGLE_SHEET_URL) {
        try {
          const sheetRes = await fetch(process.env.GOOGLE_SHEET_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              timestamp:    new Date().toISOString(),
              order_ref:    m.orderRef,
              student_name: m.studentName,
              email:        m.email,
              school:       m.school,
              size:         m.size,
              quantity:     m.quantity,
              amount:       "€" + (m.amount || payment.amount.value),
              payment_id:   payment.id,
              status:       "PAID",
              colour:       m.colour,
            }),
          });
          // Apps Script returns { inserted:false } if this payment_id already logged
          try { const j = await sheetRes.json(); if (j && j.inserted === false) inserted = false; } catch (_) {}
        } catch (e) { console.error("[webhook] sheet log error:", e.message); }
      }

      // ── 2) Confirmation email (only once, only after paid) ──
      if (inserted && process.env.RESEND_API_KEY && m.email) {
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Endless Studio <orders@endless-studio.eu>",
              to: [m.email],
              bcc: ["info@endless-studio.eu"],
              subject: `Order confirmed — ${m.school || "Endless Studio"}`,
              html: `
                <div style="font-family:Arial,Helvetica,sans-serif;color:#141412;max-width:520px">
                  <h2 style="margin:0 0 6px;letter-spacing:-0.02em">Order confirmed.</h2>
                  <p style="color:#3a3a38;line-height:1.6">Thanks ${m.studentName || ""} — your payment is confirmed and your order is locked in. We'll be in touch with delivery details.</p>
                  <table style="border-collapse:collapse;font-size:14px;margin:14px 0">
                    <tr><td style="padding:5px 16px 5px 0;color:#8b8b86">Order</td><td>${m.orderRef || "—"}</td></tr>
                    <tr><td style="padding:5px 16px 5px 0;color:#8b8b86">Item</td><td>${m.school || "—"}</td></tr>
                    <tr><td style="padding:5px 16px 5px 0;color:#8b8b86">Size</td><td>${m.size || "—"}</td></tr>
                    <tr><td style="padding:5px 16px 5px 0;color:#8b8b86">Quantity</td><td>${m.quantity || "1"}</td></tr>
                    <tr><td style="padding:5px 16px 5px 0;color:#8b8b86">Total</td><td>€${m.amount || payment.amount.value}</td></tr>
                  </table>
                  <p style="color:#8b8b86;font-size:12px">Endless Studio — designed &amp; made in-house.</p>
                </div>`,
            }),
          });
        } catch (e) { console.error("[webhook] email error:", e.message); }
      }

      console.log(`[webhook] PAID ${payment.id} — ${m.school} (${m.orderRef}) — logged:${inserted}`);
    } else {
      console.log(`[webhook] ${id} status: ${payment.status}`);
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("[webhook] error:", err);
    res.status(200).send("OK"); // still 200 — avoid Mollie retry storms
  }
};
