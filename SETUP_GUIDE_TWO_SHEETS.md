# 🎯 IPC Submission System - Setup Guide (Two Separate Sheets)

## 📋 Overview

You'll create **two separate Google Sheets**:
1. **Photo Submissions Sheet** - For photography entries
2. **Essay Submissions Sheet** - For essay/journal entries

Each evaluator gets their own sheet. Simple, clean, organized.

---

## 📸 PART 1: Create Photo Submissions Sheet

### Step 1: Create the Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create new spreadsheet
3. Name it: **"DIIMUN 2025 - Photo Submissions"**

### Step 2: Add Column Headers
In **Row 1**, add these headers:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| **IPC Code** | **Photo 1 Link** | **Photo 1 Preview** | **Description 1** | **Photo 2 Link** | **Photo 2 Preview** | **Description 2** | **Submitted At** |

### Step 3: Format the Sheet

**Header Row (Row 1):**
- Select entire row 1
- Background color: **Blue** (#4285f4)
- Text color: **White**
- Text: **Bold**
- Alignment: **Center**
- Font size: **11pt**

**Column Widths:**
- Column A (IPC Code): **100 pixels**
- Column B (Photo 1 Link): **120 pixels**
- Column C (Photo 1 Preview): **250 pixels**
- Column D (Description 1): **300 pixels**
- Column E (Photo 2 Link): **120 pixels**
- Column F (Photo 2 Preview): **250 pixels**
- Column G (Description 2): **300 pixels**
- Column H (Submitted At): **180 pixels**

**Data Rows (Row 2 onwards):**
- Select rows 2-100
- Row height: **200 pixels** (for image display)
- Vertical alignment: **Top**
- Wrap text: **Enabled**

**Freeze Header:**
- Click **View** → **Freeze** → **1 row**

### Step 4: Share with Service Account
1. Open your `GOOGLE_SERVICE_ACCOUNT_KEY` JSON file
2. Find and copy the `client_email` value  
   (looks like: `xxx@xxx-xxx.iam.gserviceaccount.com`)
3. Click the **"Share"** button (top right)
4. Paste the service account email
5. Set role to: **Editor**
6. **Uncheck** "Notify people"
7. Click **"Share"**

### Step 5: Get the Sheet ID
1. Look at the URL of your sheet:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
2. Copy the **SHEET_ID_HERE** part (between `/d/` and `/edit`)
3. Save this - you'll need it for Supabase secrets

---

## 📝 PART 2: Create Essay Submissions Sheet

### Step 1: Create the Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create new spreadsheet
3. Name it: **"DIIMUN 2025 - Essay Submissions"**

### Step 2: Add Column Headers
In **Row 1**, add these headers:

| A | B | C | D |
|---|---|---|---|
| **IPC Code** | **File Name** | **Download Link** | **Submitted At** |

### Step 3: Format the Sheet

**Header Row (Row 1):**
- Select entire row 1
- Background color: **Green** (#34a853)
- Text color: **White**
- Text: **Bold**
- Alignment: **Center**
- Font size: **11pt**

**Column Widths:**
- Column A (IPC Code): **100 pixels**
- Column B (File Name): **250 pixels**
- Column C (Download Link): **180 pixels**
- Column D (Submitted At): **180 pixels**

**Data Rows (Row 2 onwards):**
- Wrap text: **Enabled**
- Row height: **Auto**

**Freeze Header:**
- Click **View** → **Freeze** → **1 row**

### Step 4: Share with Service Account
1. Use the **same service account email** from the photo sheet
2. Click the **"Share"** button (top right)
3. Paste the service account email
4. Set role to: **Editor**
5. **Uncheck** "Notify people"
6. Click **"Share"**

### Step 5: Get the Sheet ID
1. Look at the URL of your sheet:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
2. Copy the **SHEET_ID_HERE** part
3. Save this - you'll need it for Supabase secrets

---

## 🔧 PART 3: Configure Supabase

### Set the Secrets
Run these commands in your terminal:

```bash
# Set the Photo Sheet ID
supabase secrets set GOOGLE_SHEET_PHOTO_ID=paste_photo_sheet_id_here

# Set the Essay Sheet ID
supabase secrets set GOOGLE_SHEET_ESSAY_ID=paste_essay_sheet_id_here
```

### Deploy the Edge Function
```bash
supabase functions deploy submission-processor --no-verify-jwt
```

---

## ✅ PART 4: Test the System

### Test Photo Submission
1. Go to your website: `/ipc-submission`
2. Enter a test IPC code that's registered for **photography**
3. Upload 1-2 test photos
4. Add descriptions
5. Click **"Submit Your Photos"**
6. **Check the Photo Sheet** - new row should appear with:
   - IPC Code
   - Clickable links to photos
   - Image thumbnails displayed inline
   - Descriptions
   - Timestamp

### Test Essay Submission
1. Go to your website: `/ipc-submission`
2. Enter a test IPC code that's registered for **essay**
3. Upload a test PDF
4. Click **"Submit Your Essay"**
5. **Check the Essay Sheet** - new row should appear with:
   - IPC Code
   - File name (IPC_journal_XXX.pdf)
   - Download link (click to open PDF)
   - Timestamp

---

## 🎯 What Evaluators Will See

### Photo Evaluator Opens Their Sheet:

```
┌──────────┬─────────────┬─────────────────┬───────────────────┬─────────────┬─────────────────┬───────────────────┬──────────────────┐
│ IPC Code │ Photo 1     │ Photo 1 Preview │ Description 1     │ Photo 2     │ Photo 2 Preview │ Description 2     │ Submitted At     │
│          │ Link        │                 │                   │ Link        │                 │                   │                  │
├──────────┼─────────────┼─────────────────┼───────────────────┼─────────────┼─────────────────┼───────────────────┼──────────────────┤
│   101    │ [Open...]   │ [IMAGE SHOWS]   │ Morning sunrise   │ [Open...]   │ [IMAGE SHOWS]   │ Evening sunset    │ 2025-10-08T...   │
│   102    │ [Open...]   │ [IMAGE SHOWS]   │ Medical team      │             │                 │                   │ 2025-10-08T...   │
│   103    │ [Open...]   │ [IMAGE SHOWS]   │ Hospital scene    │ [Open...]   │ [IMAGE SHOWS]   │ Patient care      │ 2025-10-08T...   │
└──────────┴─────────────┴─────────────────┴───────────────────┴─────────────┴─────────────────┴───────────────────┴──────────────────┘
```

**Features:**
- ✅ See all submissions at a glance
- ✅ Thumbnail previews display inline (no clicking needed)
- ✅ Click link for fullscreen view
- ✅ Descriptions right there
- ✅ Can add notes in columns to the right if needed

### Essay Evaluator Opens Their Sheet:

```
┌──────────┬────────────────────────┬─────────────────┬──────────────────┐
│ IPC Code │ File Name              │ Download Link   │ Submitted At     │
├──────────┼────────────────────────┼─────────────────┼──────────────────┤
│   201    │ IPC_journal_201.pdf    │ [Download PDF]  │ 2025-10-08T...   │
│   202    │ IPC_journal_202.pdf    │ [Download PDF]  │ 2025-10-08T...   │
│   203    │ IPC_journal_203.pdf    │ [Download PDF]  │ 2025-10-08T...   │
└──────────┴────────────────────────┴─────────────────┴──────────────────┘
```

**Features:**
- ✅ Clean list of all essays
- ✅ One-click PDF download
- ✅ No sign-in required
- ✅ Can add notes in columns to the right if needed

---

## 🔒 Sharing with Evaluators

### When Event Day Comes:

**For Photo Evaluator:**
1. Click "Share" on the **Photo Submissions Sheet**
2. Add their email
3. Set permission: **Viewer** or **Commenter** (not Editor)
4. Send them the link

**For Essay Evaluator:**
1. Click "Share" on the **Essay Submissions Sheet**
2. Add their email
3. Set permission: **Viewer** or **Commenter** (not Editor)
4. Send them the link

**Pro Tip:** Give them **Commenter** access so they can:
- Add comments to cells
- Discuss entries with you
- But can't accidentally delete data

---

## 📱 Mobile Friendly

Both sheets work great on mobile:
- Photo thumbnails display on phones
- Download links work on tablets
- Evaluators can work from anywhere

---

## 💾 Backup & Export

### Download a Copy:
- **File** → **Download** → **CSV** or **Excel**
- Do this before and after evaluation
- Keep records safe

### Make a Copy:
- **File** → **Make a copy**
- Create backup before evaluation starts
- Restore if something goes wrong

---

## 🎉 You're All Set!

### Final Checklist:
- [ ] Photo Sheet created with 8 columns
- [ ] Essay Sheet created with 4 columns  
- [ ] Both sheets formatted nicely
- [ ] Both sheets shared with service account (Editor)
- [ ] Service account email ends in `@xxx.iam.gserviceaccount.com`
- [ ] Both Sheet IDs copied and saved
- [ ] Secrets set in Supabase (`GOOGLE_SHEET_PHOTO_ID` and `GOOGLE_SHEET_ESSAY_ID`)
- [ ] Edge function deployed
- [ ] Test photo submission works (check Photo Sheet)
- [ ] Test essay submission works (check Essay Sheet)
- [ ] Images display in Photo Sheet
- [ ] PDFs download from Essay Sheet

**All checked? Perfect! Your system is ready for event day! 🚀**

---

## 🆘 Troubleshooting

### Issue: Sheets not updating after submission

```bash
# Check logs
supabase functions logs submission-processor

# Common fixes:
1. Verify both sheets are shared with service account
2. Check both Sheet IDs are correct (no spaces/typos)
3. Ensure service account has Editor permission
4. Verify edge function deployed successfully
```

### Issue: Images not displaying in Photo Sheet

```
1. Check if Supabase storage bucket is public
2. Test image URL in browser (should open)
3. Wait a few seconds (Google Sheets caches images)
4. Try refresh (Ctrl+R or Cmd+R)
```

### Issue: PDF links not working

```
1. Check file was uploaded to Supabase
2. Test URL in browser (should download)
3. Verify bucket permissions allow public access
```

### Issue: Permission denied errors in logs

```
1. Re-share both sheets with service account
2. Make sure role is "Editor" not "Viewer"
3. Check service account JSON key is valid
4. Verify Google Sheets API is enabled in Cloud Console
```

---

## 📞 Need Help?

Check these files:
- **This guide** - Setup instructions
- **Edge function code** - `supabase/functions/submission-processor/index.ts`
- **Frontend page** - `src/components/pages/IPCSubmission.jsx`

Everything is ready to go! 🎊
