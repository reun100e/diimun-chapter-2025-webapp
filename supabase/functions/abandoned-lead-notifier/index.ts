import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record;
    const oldRecord = payload.old_record;

    if (payload.type !== "UPDATE" || record.status !== "Abandoned" || oldRecord.status !== "Partial") {
      return new Response("OK: Not an abandoned lead event.", { status: 200 });
    }

    const message = `
🔔 *Abandoned Lead Alert (1 Hour Old)* 🔔

This user started registering but did not complete the form. This is a high-priority lead for follow-up.

*Name:* ${record.name || 'Not provided'}
*Email:* ${record.email || 'Not provided'}
*WhatsApp:* ${record.whatsapp_number || 'Not provided'}
*Chosen Role/Committee:* ${record.committee_preference || 'Not yet chosen'}
    `.trim();

    const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(apiUrl, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: "Markdown" }),
    });

    return new Response("OK: Abandoned lead notification sent.", { status: 200 });
  } catch (error) {
    console.error("Function Error:", error.message);
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }
});