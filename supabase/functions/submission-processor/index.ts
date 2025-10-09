// supabase/functions/submission-processor/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { JWT } from "npm:google-auth-library@^9";

// --- GET SECRETS ---
const SERVICE_ACCOUNT_KEY = JSON.parse(Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY")!);
const PHOTO_SHEET_ID = Deno.env.get("GOOGLE_SHEET_PHOTO_ID")!;
const ESSAY_SHEET_ID = Deno.env.get("GOOGLE_SHEET_ESSAY_ID")!;

serve(async (req) => {
  try {
    const { record: submission } = await req.json();

    // Initialize JWT client for service account authentication
    const jwtClient = new JWT({
      email: SERVICE_ACCOUNT_KEY.client_email,
      key: SERVICE_ACCOUNT_KEY.private_key,
      scopes: [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    // Get access token
    const tokens = await jwtClient.authorize();
    const accessToken = tokens.access_token;
    const authHeaders = { 
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    };

    // --- PROCESS SUBMISSION BASED ON TYPE ---
    if (submission.submission_type === 'essay' && submission.file_url_pdf) {
      // For essays: Add to dedicated Essay Google Sheet
      const essayData = [
        submission.ipc_code,
        `IPC_journal_${submission.ipc_code}.pdf`,
        `=HYPERLINK("${submission.file_url_pdf}", "Download PDF")`,
        new Date().toISOString(),
      ];
      
      await appendToSheet(essayData, authHeaders, ESSAY_SHEET_ID);

    } else if (submission.submission_type === 'photography') {
      // For photos: Add to dedicated Photo Google Sheet
      const sheetData = [
        submission.ipc_code,
        submission.file_url_1 ? `=HYPERLINK("${submission.file_url_1}", "Open Photo 1")` : "",
        submission.file_url_1 ? `=IMAGE("${submission.file_url_1}", 2)` : "",
        submission.description_1 || "",
        submission.file_url_2 ? `=HYPERLINK("${submission.file_url_2}", "Open Photo 2")` : "",
        submission.file_url_2 ? `=IMAGE("${submission.file_url_2}", 2)` : "",
        submission.description_2 || "",
        new Date().toISOString(),
      ];

      await appendToSheet(sheetData, authHeaders, PHOTO_SHEET_ID);
    }

    return new Response("OK: Submission processed.", { status: 200 });
  } catch (error) {
    console.error("Function Error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
  }
});

// --- HELPER FUNCTIONS ---
async function appendToSheet(rowData: (string | number)[], authHeaders: HeadersInit, sheetId: string) {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ values: [rowData] }),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Sheets append failed: ${errorText}`);
  }
  return await res.json();
}