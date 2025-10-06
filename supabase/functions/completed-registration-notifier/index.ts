import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record;
    const oldRecord = payload.old_record;

    if (payload.type !== "UPDATE" || record.status !== "Completed" || oldRecord.status === "Completed") {
      return new Response("OK: Not a new completion.", { status: 200 });
    }

    const message = `
🎉 *New DIIMUN Registration Completed!* 🎉

*Name:* ${record.name || 'N/A'}
*Email:* ${record.email || 'N/A'}
*WhatsApp:* ${record.whatsapp_number || 'N/A'}
*Role/Committee:* ${record.committee_preference || 'N/A'}
*College:* ${record.college || 'N/A'}
*Year:* ${record.year || 'N/A'}
*Amount Paid:* ₹${record.registration_amount || 'N/A'}
*Esperanza Offer:* ${record.has_registered_esperanza || 'No'}
    `.trim();

    const isEsperanzaUser = record.has_registered_esperanza && record.has_registered_esperanza.toLowerCase() === 'yes';
    
    let apiUrl: string;
    let requestBody: object;

    if (isEsperanzaUser && record.mun_payment_photo_url && record.esperanza_payment_photo_url) {
      apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMediaGroup`;
      requestBody = {
        chat_id: CHAT_ID,
        media: [
          { type: 'photo', media: record.mun_payment_photo_url },
          { type: 'photo', media: record.esperanza_payment_photo_url }
        ]
      };
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "Markdown" })
      });
    } else {
      apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
      requestBody = {
        chat_id: CHAT_ID,
        photo: record.mun_payment_photo_url,
        caption: message,
        parse_mode: "Markdown",
      };
    }

    const response = await fetch(apiUrl, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) throw new Error(await response.text());

    return new Response("OK: Completion notification sent.", { status: 200 });
  } catch (error) {
    console.error("Function Error:", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
});