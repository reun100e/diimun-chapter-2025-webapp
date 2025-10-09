# IPC Submission Portal - Implementation Guide

## 🎉 What's Been Built

A beautiful, modern, and secure submission portal for International Press Corps participants to submit their photography or essay entries.

## 📍 How to Access

The submission page is accessible at:
```
https://dna.aghosh.in/ipc-submission
```

This is a **standalone page** that participants can access via direct link (no navigation menu link).

## ✨ Features Implemented

### 1. **Three-Step User Journey**

#### Step 1: IPC Code Entry
- Clean, centered input field for IPC code
- Real-time validation against `ipc_codes` table in Supabase
- Error handling for:
  - Invalid codes
  - Already used codes
  - Database errors

#### Step 2: Dynamic Submission Form
The form automatically adapts based on the code type:

**For Photography Submissions:**
- Upload up to 2 photos (JPG, PNG, HEIC)
- Optional description for each photo
- File size limit: 10MB per photo
- Drag-and-drop or click to upload
- Image preview before submission
- Remove/replace functionality

**For Essay Submissions:**
- Upload single PDF file
- File size limit: 5MB
- Display of formatting requirements:
  - Times New Roman, Size 12
  - Line Spacing: 1.15
  - 500-700 words
- File name and size preview

#### Step 3: Success Confirmation
- Celebratory success animation
- Display submitted IPC code
- Information about evaluation process
- Return to home button

### 2. **Security & Validation**

✅ **Client-Side Validation:**
- File type checking (JPEG, PNG, HEIC for photos; PDF for essays)
- File size validation (10MB for photos, 5MB for PDFs)
- Required field validation
- IPC code format validation

✅ **Anonymity Enforcement:**
- Prominent warning banners about identity disclosure
- Clear instructions to avoid watermarks, names, or identifying info
- Multiple reminders throughout the form

✅ **Backend Integration:**
- Checks `ipc_codes` table for validity
- Prevents duplicate submissions (is_used flag)
- Uploads files to Supabase `ipc-submissions` bucket
- Inserts records into `ipc_submissions` table
- Triggers webhook for Google Drive/Sheets processing

### 3. **UI/UX Design**

🎨 **Design Language:**
- Matches existing website aesthetic
- Gradient backgrounds (slate-50 → blue-50 → indigo-50)
- Card-based layouts with glass-morphism
- Smooth animations using Framer Motion
- Responsive design (mobile, tablet, desktop)

🎯 **User Experience:**
- Loading states for all async operations
- Clear error messages
- Visual feedback (success/error states)
- Accessible form controls
- Intuitive file upload interface

## 🔧 Technical Details

### File Structure
```
src/components/pages/IPCSubmission.jsx  ← Main submission page component
src/App.jsx                             ← Updated with new route
```

### Route Configuration
```javascript
// Access via URL: /ipc-submission
case 'ipc-submission':
  return (
    <Suspense fallback={<PageLoader />}>
      <IPCSubmission />
    </Suspense>
  )
```

### Supabase Integration

**Tables Used:**
- `ipc_codes` - Validates IPC codes and checks usage status
- `ipc_submissions` - Stores submission data (triggers webhook)

**Storage:**
- Bucket: `ipc-submissions`
- Photo naming: `photo_{ipcCode}_{timestamp}_1.{ext}`
- Essay naming: `essay_{ipcCode}_{timestamp}.pdf`

**Workflow:**
1. User submits form
2. Files uploaded to Supabase Storage
3. Public URLs obtained
4. Record inserted into `ipc_submissions` table
5. **Webhook triggers** `submission-processor` edge function
6. Edge function processes files → Google Drive + Google Sheets
7. Files renamed to: `IPC_journal_{code}.pdf` or `IPC_photo_{code}-1.jpg`

### Supported File Formats

**Photography:**
- JPEG/JPG (`.jpg`, `.jpeg`)
- PNG (`.png`)
- HEIC/HEIF (`.heic`, `.heif`) - iOS native format

**Essay:**
- PDF (`.pdf`)

## 📱 Mobile Compatibility

✅ Fully responsive design
✅ Touch-friendly upload areas
✅ Works with mobile cameras (iOS & Android)
✅ HEIC support for iPhone users
✅ Optimized for small screens

## 🚀 Testing the Page

### To Test Locally:

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Access the page:**
   Navigate to: `http://localhost:5173/ipc-submission`

3. **Test Flow:**
   - Enter a valid IPC code from your `ipc_codes` table
   - Upload test photos or PDF
   - Verify submission success

### To Populate Test IPC Codes:

You mentioned you'll do this manually, but when ready, you can insert codes like:
```sql
INSERT INTO public.ipc_codes (ipc_code, category, is_used)
VALUES 
  ('101', 'photography', false),
  ('102', 'essay', false);
```

## 📊 Data Flow

```
User Input (IPC Code)
    ↓
Validation (Supabase: ipc_codes table)
    ↓
File Upload (Supabase Storage: ipc-submissions bucket)
    ↓
Database Insert (Supabase: ipc_submissions table)
    ↓
Webhook Trigger (submission-processor edge function)
    ↓
Google Drive Upload (renamed files)
    ↓
Google Sheets Update (for photo evaluations)
```

## 🎯 Sharing with Participants

When the event day arrives, share the link:
```
https://dna.aghosh.in/ipc-submission
```

Provide each participant with their unique IPC code (either printed on a card, via email, or WhatsApp).

## 🔒 Security Features

1. **IPC Code Validation** - Only pre-registered codes work
2. **One-Time Use** - Each code can only be used once (is_used flag)
3. **File Type Restrictions** - Only allowed formats can be uploaded
4. **File Size Limits** - Prevents abuse and server overload
5. **Anonymous Processing** - Files renamed to strip user info
6. **Supabase RLS** - Row Level Security policies protect data

## 🎨 Customization Options

If you want to adjust styling:
- Colors are controlled via Tailwind classes
- Main gradients: `from-indigo-600 to-blue-600` (primary buttons)
- Success: `from-emerald-600 to-teal-600`
- Background: `from-slate-50 via-blue-50 to-indigo-50`

## ❓ Troubleshooting

### Common Issues:

1. **"Invalid IPC Code" error:**
   - Ensure code exists in `ipc_codes` table
   - Check spelling/case sensitivity

2. **Upload fails:**
   - Check Supabase storage bucket exists
   - Verify storage policies allow anon uploads
   - Check file size limits

3. **Submission not triggering webhook:**
   - Verify webhook is configured in Supabase Dashboard
   - Check edge function deployment status
   - Review edge function logs

## 🎉 What's Next?

The frontend is **100% complete**! 

On event day:
1. Populate the `ipc_codes` table with participant codes
2. Share the submission link with participants
3. Monitor submissions via Supabase Dashboard
4. Share Google Drive folders/sheets with evaluators

The entire backend automation (Google Drive upload, file renaming, Google Sheets population) will happen automatically via your edge function! 🚀

