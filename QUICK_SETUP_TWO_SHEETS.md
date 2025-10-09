# ⚡ Quick Setup - Two Google Sheets

## 🎯 What You're Creating

Two separate Google Sheets:
1. **Photo Submissions** - For photography evaluator
2. **Essay Submissions** - For essay evaluator

---

## 📸 Sheet 1: Photo Submissions

### Create & Name
```
1. Go to: https://sheets.google.com
2. Create new blank sheet
3. Name: "DIIMUN 2025 - Photo Submissions"
```

### Copy These Headers into Row 1
```
A1: IPC Code
B1: Photo 1 Link
C1: Photo 1 Preview
D1: Description 1
E1: Photo 2 Link
F1: Photo 2 Preview
G1: Description 2
H1: Submitted At
```

### Quick Format
```
1. Select Row 1
2. Background: Blue (#4285f4)
3. Text: White, Bold, Center
4. View → Freeze → 1 row
5. Set row height for rows 2-100: 200 pixels
6. Set column C width: 250px
7. Set column F width: 250px
```

### Share with Service Account
```
1. Open your service account JSON key
2. Copy the "client_email" value
3. Click "Share" button
4. Paste email
5. Permission: Editor
6. Uncheck "Notify people"
7. Click Share
```

### Get Sheet ID
```
From URL: docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
Copy the SHEET_ID_HERE part
```

---

## 📝 Sheet 2: Essay Submissions

### Create & Name
```
1. Go to: https://sheets.google.com
2. Create new blank sheet
3. Name: "DIIMUN 2025 - Essay Submissions"
```

### Copy These Headers into Row 1
```
A1: IPC Code
B1: File Name
C1: Download Link
D1: Submitted At
```

### Quick Format
```
1. Select Row 1
2. Background: Green (#34a853)
3. Text: White, Bold, Center
4. View → Freeze → 1 row
5. Set column B width: 250px
```

### Share with Service Account
```
1. Use SAME service account email from Photo Sheet
2. Click "Share" button
3. Paste email
4. Permission: Editor
5. Uncheck "Notify people"
6. Click Share
```

### Get Sheet ID
```
From URL: docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
Copy the SHEET_ID_HERE part
```

---

## 🔧 Configure Supabase

### Set Secrets (in terminal)
```bash
supabase secrets set GOOGLE_SHEET_PHOTO_ID=your_photo_sheet_id_here
supabase secrets set GOOGLE_SHEET_ESSAY_ID=your_essay_sheet_id_here
```

### Deploy Function
```bash
supabase functions deploy submission-processor --no-verify-jwt
```

---

## ✅ Test It

### Test Photo
```
1. Go to: /ipc-submission
2. Enter photography IPC code
3. Upload test photos
4. Submit
5. Check Photo Sheet → new row with images!
```

### Test Essay
```
1. Go to: /ipc-submission
2. Enter essay IPC code
3. Upload test PDF
4. Submit
5. Check Essay Sheet → new row with download link!
```

---

## 📊 Final Result

### Photo Sheet Will Look Like:
| IPC Code | Photo 1 Link | Photo 1 Preview | Description 1 | Photo 2 Link | Photo 2 Preview | Description 2 | Submitted At |
|----------|--------------|-----------------|---------------|--------------|-----------------|---------------|--------------|
| 101 | [link] | [thumbnail] | "Sunrise" | [link] | [thumbnail] | "Sunset" | 2025-10-08... |
| 102 | [link] | [thumbnail] | "Medical team" | | | | 2025-10-08... |

### Essay Sheet Will Look Like:
| IPC Code | File Name | Download Link | Submitted At |
|----------|-----------|---------------|--------------|
| 201 | IPC_journal_201.pdf | [Download PDF] | 2025-10-08... |
| 202 | IPC_journal_202.pdf | [Download PDF] | 2025-10-08... |

---

## 🎁 Bonus: Share with Evaluators

When event day comes:

**Photo Evaluator:**
```
1. Open Photo Sheet
2. Click "Share"
3. Add evaluator's email
4. Permission: Commenter (so they can add notes)
5. Send link
```

**Essay Evaluator:**
```
1. Open Essay Sheet
2. Click "Share"
3. Add evaluator's email
4. Permission: Commenter (so they can add notes)
5. Send link
```

---

## 🎉 Done!

**Total time:** ~10 minutes

**What happens now:**
1. ✅ User submits photo → Auto-populates Photo Sheet
2. ✅ User submits essay → Auto-populates Essay Sheet
3. ✅ Photos display as thumbnails (no clicking needed!)
4. ✅ Essays are one-click downloads
5. ✅ Each evaluator gets their own clean sheet
6. ✅ Everything automatic, no manual work

---

## 🔗 Need More Details?

See: **SETUP_GUIDE_TWO_SHEETS.md** for detailed instructions with screenshots and troubleshooting.
