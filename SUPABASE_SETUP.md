# Supabase Registration Form Setup Guide

This guide explains how to set up the Supabase backend for the DIIMUN registration form.

## 🚀 Quick Start

### 1. Environment Setup

1. Copy the `.env` file and replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

2. Restart your development server after updating the `.env` file.

### 2. Supabase Project Setup

#### Create the Database Table

In your Supabase dashboard, go to the **Table Editor** and create a new table called `registrations` with these columns:

| Column Name | Type | Settings |
|-------------|------|----------|
| `id` | `int8` | Primary key, auto-increment |
| `created_at` | `timestamptz` | Default: `now()` |
| `name` | `text` | Required |
| `whatsapp_number` | `text` | Required |
| `email` | `text` | Required |
| `college` | `text` | Required |
| `year` | `text` | Required |
| `registration_type` | `text` | Required |
| `payment_photo_url` | `text` | Required |
| `status` | `text` | Default: `'Pending Verification'` |

**Important:** Uncheck "Enable Row Level Security (RLS)" for now to simplify development.

#### Create Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click **"Create a new bucket"**
3. Name it `payment-screenshots`
4. Toggle **"Public bucket"** to **ON**
5. Click **"Create bucket"**

### 3. Registration Form Features

The registration form includes:

- ✅ **Personal Information**: Name, WhatsApp, Email
- ✅ **Academic Details**: College, Year of study
- ✅ **Registration Type**: MUN Only (₹500) or MUN + Conference (₹800)
- ✅ **Payment Upload**: UPI screenshot upload with preview
- ✅ **Form Validation**: Email, phone number, and file validation
- ✅ **Success/Error Handling**: User-friendly feedback
- ✅ **Responsive Design**: Works on all devices
- ✅ **Consistent Styling**: Matches existing DIIMUN design

### 4. Form Flow

1. User fills out personal and academic information
2. User selects registration type (MUN or MUN + Conference)
3. User uploads payment screenshot
4. Form validates all inputs
5. Image is uploaded to Supabase Storage
6. Registration data (including image URL) is saved to database
7. User sees success confirmation

### 5. Admin/Verification Features

- All registrations are stored with status "Pending Verification"
- Payment screenshots are publicly accessible for verification
- Complete registration data is available in the Supabase dashboard

### 6. Development Notes

- The form uses Vite environment variables (prefixed with `VITE_`)
- All styling matches the existing design system
- Form includes comprehensive error handling
- File uploads are limited to PNG/JPG images
- The registration section is integrated into the main app at `#register`

### 7. Security Considerations

For production:
1. Enable Row Level Security (RLS) on the registrations table
2. Add proper authentication if needed
3. Implement rate limiting
4. Add CAPTCHA if spam becomes an issue

## 🎨 Design Integration

The registration form seamlessly integrates with the existing DIIMUN design:
- Uses the same color palette (midnight, cognac, gold, pearl)
- Follows the same typography hierarchy
- Includes consistent animations and hover effects
- Responsive design matching other components

## 📱 Navigation Integration

The registration form is accessible via:
- Hero section "Register Now" button
- Navigation bar "Register Now" button (desktop & mobile)
- Direct URL anchor `#register`

All navigation elements are already configured and working.
