// ═══════════════════════════════════════════════════════
//  ENDLESS STUDIO — Order Logbook (Google Apps Script)
//  Paste this into script.google.com (bound to your Orders
//  spreadsheet), then Deploy → New deployment → Web app:
//    • Execute as: Me
//    • Who has access: Anyone
//  Copy the /exec URL into the Vercel env var GOOGLE_SHEET_URL.
//
//  Called by /api/webhook after a Mollie payment is PAID.
//  Idempotent: dedupes by Mollie payment id and returns
//  { inserted:false } if the order was already logged, so the
//  webhook never sends a duplicate confirmation email.
// ═══════════════════════════════════════════════════════

const SHEET_NAME = 'Orders';
const HEADERS = [
  'Timestamp','Order Ref','Student Name','Email','School',
  'Size','Quantity','Amount','Mollie Payment ID','Status','Colour'
];

function doGet() {
  return ContentService
    .createTextOutput('Endless Studio Order Tracker — OK')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const result = appendOrderRow(data);
    return json({ success: true, inserted: result.inserted });
  } catch (err) {
    return json({ success: false, error: err.message });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function appendOrderRow(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const hdr = sheet.getRange(1, 1, 1, HEADERS.length);
    hdr.setValues([HEADERS]);
    hdr.setBackground('#111110').setFontColor('#F2F1EC').setFontWeight('bold').setFontSize(10);
    sheet.setFrozenRows(1);
    [160,150,170,200,220,70,80,90,190,80,110].forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  }

  // ── Idempotency: skip if this Mollie payment id is already logged ──
  const pid = data.payment_id || '';
  if (pid) {
    const ids = sheet.getRange(2, 9, Math.max(sheet.getLastRow() - 1, 1), 1).getValues();
    for (let i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === String(pid)) return { inserted: false };
    }
  }

  const ts = data.timestamp
    ? new Date(data.timestamp).toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })
    : new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' });

  const row = [
    ts,
    data.order_ref    || '—',
    data.student_name || '—',
    data.email        || '—',
    data.school       || '—',
    data.size         || '—',
    data.quantity     || '1',
    data.amount       || '—',
    data.payment_id   || '—',
    data.status       || 'PAID',
    data.colour       || '—',
  ];

  const newRow = sheet.getLastRow() + 1;
  sheet.getRange(newRow, 1, 1, row.length).setValues([row]);
  sheet.getRange(newRow, 1, 1, row.length).setBackground(newRow % 2 === 0 ? '#FAF7F3' : '#FFFFFF');
  sheet.getRange(newRow, 10).setFontColor('#2D7A4A').setFontWeight('bold');

  return { inserted: true };
}
