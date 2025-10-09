# 🧹 Cleanup Test Data - Prepare for Production

## ⚠️ WARNING
This will **permanently delete ALL test data**. Only do this when you're ready to go live with real event data!

---

## 📋 Step-by-Step Cleanup

### Step 1: Clear Database Tables (2 minutes)

#### Via Supabase Dashboard:
1. Go to **Supabase Dashboard**
2. Click **SQL Editor**
3. Click **"New query"**
4. Copy and paste the contents of `cleanup_test_data.sql`
5. Click **"Run"**
6. ✅ You should see:
   ```
   ipc_codes: 0 rows
   ipc_submissions: 0 rows
   ```

#### Via CLI:
```bash
supabase db execute --file cleanup_test_data.sql
```

---

### Step 2: Clear Storage Bucket (3 minutes)

#### Option A: Via Supabase Dashboard (Easier)
1. Go to **Supabase Dashboard**
2. Click **Storage** (left sidebar)
3. Click on **"ipc-submissions"** bucket
4. **Select all files** (checkbox at top)
5. Click **"Delete"** button
6. Confirm deletion
7. ✅ Bucket should now be empty

#### Option B: Via SQL (Delete all at once)
```sql
-- Run this in SQL Editor to delete all files from storage
SELECT storage.delete_object('ipc-submissions', name)
FROM storage.objects
WHERE bucket_id = 'ipc-submissions';
```

#### Option C: Via CLI (If you have local Supabase setup)
```bash
# List all files
supabase storage ls ipc-submissions

# Delete all files (replace with actual file names)
supabase storage rm ipc-submissions/*
```

---

### Step 3: Clear Google Sheets (1 minute each)

#### Photo Sheet:
1. Open your **"DIIMUN 2025 - Photo Submissions"** sheet
2. Select **Row 2** (first data row)
3. **Shift+Click** on a row far down (like Row 100)
4. Right-click → **Delete rows**
5. ✅ Only header row should remain

#### Essay Sheet:
1. Open your **"DIIMUN 2025 - Essay Submissions"** sheet
2. Select **Row 2** (first data row)
3. **Shift+Click** on a row far down (like Row 100)
4. Right-click → **Delete rows**
5. ✅ Only header row should remain

**Quick method for both sheets:**
- Select all data rows
- Press `Delete` key (this clears content but keeps rows)
- Then right-click → Delete rows (to remove empty rows)

---

## ✅ Verification Checklist

After cleanup, verify everything is empty:

### Database:
```sql
-- Run in SQL Editor - should show 0 for all
SELECT 
  (SELECT COUNT(*) FROM ipc_codes) as codes_count,
  (SELECT COUNT(*) FROM ipc_submissions) as submissions_count;
```

### Storage:
- Navigate to: **Storage → ipc-submissions**
- Should show: **"No files found"** or empty list

### Google Sheets:
- **Photo Sheet**: Only blue header row (Row 1) visible
- **Essay Sheet**: Only green header row (Row 1) visible

---

## 🎯 Now You're Ready For Production!

### Next Steps:

1. **Populate Real IPC Codes:**
   ```sql
   -- Example: Insert real codes for event
   INSERT INTO public.ipc_codes (ipc_code, category, is_used)
   VALUES 
     ('101', 'photography', false),
     ('102', 'photography', false),
     ('201', 'essay', false),
     ('202', 'essay', false);
     -- Add all your real codes here
   ```

2. **Final System Check:**
   - [ ] Database tables empty
   - [ ] Storage bucket empty
   - [ ] Google Sheets have only headers
   - [ ] Edge function deployed
   - [ ] Secrets configured
   - [ ] Real IPC codes loaded

3. **Do One Final Test:**
   - Submit with a real IPC code
   - Verify it appears in correct Google Sheet
   - Then delete that test entry manually
   - You're ready to go live! 🚀

---

## 🔄 Bulk Insert Real IPC Codes

### Method 1: Via SQL (Recommended for large batches)

```sql
-- Template for bulk insert
INSERT INTO public.ipc_codes (ipc_code, category, is_used)
VALUES 
  ('101', 'photography', false),
  ('102', 'photography', false),
  ('103', 'photography', false),
  ('104', 'photography', false),
  ('105', 'photography', false),
  ('201', 'essay', false),
  ('202', 'essay', false),
  ('203', 'essay', false),
  ('204', 'essay', false),
  ('205', 'essay', false);
  -- Add as many as needed
```

### Method 2: Via CSV Import

1. Create a CSV file `ipc_codes.csv`:
   ```csv
   ipc_code,category,is_used
   101,photography,false
   102,photography,false
   201,essay,false
   202,essay,false
   ```

2. In Supabase Dashboard:
   - Go to **Table Editor** → **ipc_codes**
   - Click **"Import data from CSV"**
   - Upload your CSV file
   - Map columns correctly
   - Click **"Import"**

### Method 3: Generate Codes Programmatically

```sql
-- Generate photography codes 101-150
INSERT INTO public.ipc_codes (ipc_code, category, is_used)
SELECT 
  (100 + generate_series)::text as ipc_code,
  'photography' as category,
  false as is_used
FROM generate_series(1, 50);

-- Generate essay codes 201-250
INSERT INTO public.ipc_codes (ipc_code, category, is_used)
SELECT 
  (200 + generate_series)::text as ipc_code,
  'essay' as category,
  false as is_used
FROM generate_series(1, 50);
```

---

## 📊 Monitor During Event

### Check Submission Count:
```sql
SELECT 
  submission_type,
  COUNT(*) as total_submissions
FROM ipc_submissions
GROUP BY submission_type;
```

### Check Remaining Codes:
```sql
SELECT 
  category,
  COUNT(*) as total_codes,
  SUM(CASE WHEN is_used THEN 1 ELSE 0 END) as used_codes,
  COUNT(*) - SUM(CASE WHEN is_used THEN 1 ELSE 0 END) as remaining_codes
FROM ipc_codes
GROUP BY category;
```

### Check Recent Submissions:
```sql
SELECT 
  ipc_code,
  submission_type,
  created_at
FROM ipc_submissions
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🆘 Emergency: Reset Individual Code

If someone needs to resubmit (wrong file, etc.):

```sql
-- Reset a specific code to allow resubmission
UPDATE ipc_codes 
SET is_used = false 
WHERE ipc_code = '101';

-- Delete their previous submission
DELETE FROM ipc_submissions 
WHERE ipc_code = '101';

-- Also manually delete their row from Google Sheet
-- And delete their files from Storage bucket
```

---

## 💾 Backup Before Cleanup

**Recommended:** Export data before deleting:

```sql
-- Export codes (if you want to keep them)
COPY (SELECT * FROM ipc_codes) TO '/tmp/ipc_codes_backup.csv' CSV HEADER;

-- Or via Supabase Dashboard:
-- Table Editor → ipc_codes → Export → CSV
```

---

## ✅ Cleanup Complete!

Your system is now **clean and ready for production**! 🎉

All test data removed from:
- ✅ `ipc_codes` table
- ✅ `ipc_submissions` table  
- ✅ Storage bucket
- ✅ Google Sheets

Now populate with real IPC codes and you're ready to go live! 🚀
