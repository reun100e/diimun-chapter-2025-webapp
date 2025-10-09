# 🚀 Deploy IPC Submission System - Action Steps

## ✅ What's Ready

✅ **Frontend:** Beautiful submission page at `/ipc-submission`  
✅ **Backend:** Edge function updated for two separate sheets  
✅ **Storage:** Supabase bucket configured  
✅ **Database:** Tables created (`ipc_codes`, `ipc_submissions`)  

---

## 📋 What You Need to Do (3 Steps)

### Step 1: Create Two Google Sheets (10 minutes)

#### **Photo Sheet:**
```
1. Go to: https://sheets.google.com
2. Create blank sheet
3. Name: "DIIMUN 2025 - Photo Submissions"
4. Add headers in Row 1:
   A1: IPC Code
   B1: Photo 1 Link
   C1: Photo 1 Preview
   D1: Description 1
   E1: Photo 2 Link
   F1: Photo 2 Preview
   G1: Description 2
   H1: Submitted At

5. Format:
   - Row 1: Blue background, white text, bold
   - Rows 2-100: Height 200px
   - View → Freeze → 1 row

6. Share with service account:
   - Get email from your service account JSON
   - Click Share → Paste email → Editor → Share

7. Copy Sheet ID from URL
```

#### **Essay Sheet:**
```
1. Go to: https://sheets.google.com
2. Create blank sheet
3. Name: "DIIMUN 2025 - Essay Submissions"
4. Add headers in Row 1:
   A1: IPC Code
   B1: File Name
   C1: Download Link
   D1: Submitted At

5. Format:
   - Row 1: Green background, white text, bold
   - View → Freeze → 1 row

6. Share with service account:
   - Use SAME email as photo sheet
   - Click Share → Paste email → Editor → Share

7. Copy Sheet ID from URL
```

**Need help?** See **QUICK_SETUP_TWO_SHEETS.md** for visual guide.

---

### Step 2: Configure Supabase (2 minutes)

Open your terminal and run:

```bash
# Set Photo Sheet ID
supabase secrets set GOOGLE_SHEET_PHOTO_ID=paste_your_photo_sheet_id_here

# Set Essay Sheet ID
supabase secrets set GOOGLE_SHEET_ESSAY_ID=paste_your_essay_sheet_id_here

# Deploy the edge function
supabase functions deploy submission-processor --no-verify-jwt
```

**Expected output:**
```
Deploying submission-processor (project ref: sauspcwwqexoicuiytln)
✓ Deployed Function submission-processor
```

---

### Step 3: Test the System (5 minutes)

#### Test Photo Submission:
```
1. Go to: http://localhost:5173/ipc-submission (or your deployed URL)
2. Enter a test IPC code (must exist in ipc_codes table with category='photography')
3. Upload 1-2 test photos (JPG/PNG)
4. Add descriptions
5. Click "Submit Your Photos"
6. ✅ Should see success message
7. ✅ Check Photo Sheet - new row should appear with images!
```

#### Test Essay Submission:
```
1. Go to: http://localhost:5173/ipc-submission (or your deployed URL)
2. Enter a test IPC code (must exist in ipc_codes table with category='essay')
3. Upload a test PDF
4. Click "Submit Your Essay"
5. ✅ Should see success message
6. ✅ Check Essay Sheet - new row should appear with download link!
```

---

## 🧪 Add Test IPC Codes (Optional - For Testing)

If you need test codes to try the system:

```sql
-- Run in Supabase SQL Editor
INSERT INTO public.ipc_codes (ipc_code, category, is_used)
VALUES 
  ('TEST_PHOTO_101', 'photography', false),
  ('TEST_ESSAY_201', 'essay', false);
```

Then test with these codes!

---

## 🎯 Before Event Day

### Week Before:
- [ ] Populate `ipc_codes` table with all participant codes
- [ ] Test both photo and essay submissions end-to-end
- [ ] Verify images display in Photo Sheet
- [ ] Verify PDFs download from Essay Sheet
- [ ] Share Photo Sheet with photo evaluator (Commenter permission)
- [ ] Share Essay Sheet with essay evaluator (Commenter permission)

### Day Before:
- [ ] Do final test submission
- [ ] Check all sheets are shared correctly
- [ ] Backup both sheets (File → Make a copy)
- [ ] Prepare submission link: `dna.aghosh.in/ipc-submission`

### Event Day:
- [ ] Monitor submissions: Supabase Dashboard → Table Editor → ipc_submissions
- [ ] Check edge function logs: `supabase functions logs submission-processor`
- [ ] Have backup plan ready (email submissions if tech fails)

---

## 📊 What Happens After Submission

```
1. User submits via /ipc-submission
   ↓
2. Files uploaded to Supabase Storage (ipc-submissions bucket)
   ↓
3. Record inserted into ipc_submissions table
   ↓
4. Webhook triggers submission-processor edge function
   ↓
5. Edge function adds row to appropriate Google Sheet
   ↓
6. Evaluator sees new entry instantly (with auto-refresh)
```

**Time:** Entire process takes ~3-5 seconds

---

## 🔍 Monitoring on Event Day

### Check Submissions:
```
Supabase Dashboard → Table Editor → ipc_submissions
- See all submissions in real-time
- Filter by submission_type
- Check status column
```

### Check Files:
```
Supabase Dashboard → Storage → ipc-submissions
- See all uploaded files
- Download if needed
- Check file sizes
```

### Check Logs:
```bash
supabase functions logs submission-processor --tail
```
Look for: `"OK: Submission processed."`

---

## 🎉 Success Checklist

After setup, verify:
- [ ] Photo Sheet exists with 8 columns
- [ ] Essay Sheet exists with 4 columns
- [ ] Both sheets shared with service account (Editor)
- [ ] Secrets set in Supabase (GOOGLE_SHEET_PHOTO_ID and GOOGLE_SHEET_ESSAY_ID)
- [ ] Edge function deployed successfully
- [ ] Test photo submission works → appears in Photo Sheet with images
- [ ] Test essay submission works → appears in Essay Sheet with download link
- [ ] Images display correctly (may take a few seconds)
- [ ] PDF downloads work
- [ ] Frontend page looks good at /ipc-submission

**All checked? You're ready! 🚀**

---

## 🆘 Quick Troubleshooting

**Sheets not updating?**
```bash
# Check logs
supabase functions logs submission-processor

# Common fix: Re-share sheets with service account
```

**Images not showing?**
```
- Wait 5-10 seconds (Google caches)
- Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R)
- Check image URL works in browser
```

**Permission errors?**
```
- Verify both sheets shared with service account
- Role must be "Editor" (not Viewer)
- Check service account email is correct
```

---

## 📚 Full Documentation

- **SETUP_GUIDE_TWO_SHEETS.md** - Detailed setup with formatting
- **QUICK_SETUP_TWO_SHEETS.md** - Quick visual reference  
- **IPC_SUBMISSION_SYSTEM_README.md** - Complete system overview
- **This file** - Deployment action steps

---

## 🎊 Ready to Launch!

Your IPC Submission System is **fully built and ready to deploy**!

Just follow the 3 steps above:
1. ✅ Create two Google Sheets (10 min)
2. ✅ Configure Supabase secrets (2 min)
3. ✅ Test it (5 min)

**Total time: ~20 minutes**

Then you're live! 🚀

Good luck with DIIMUN 2025! 🎉
