# Supabase API Key Update Guide

## Overview
Supabase has introduced new, more secure API keys. While the old `anon` key still works, it's recommended to migrate to the new format for better security and future compatibility.

## Steps to Update Your API Key

### 1. Get Your New Publishable Key
1. Go to your **Supabase Dashboard**
2. Navigate to your project
3. Go to **Project Settings** (gear icon)
4. Click on the **API** tab
5. In the "Project API keys" section, find the new **Publishable** key
6. It will start with `sb_publishable_...`
7. Click the "Copy" icon next to it

### 2. Update Your Environment File
1. Open your `.env` file in the root of your React project
2. Find the line with your current anon key:
   ```
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Replace it with the new publishable key:
   ```
   VITE_SUPABASE_ANON_KEY=sb_publishable_...
   ```

### 3. Restart Your Development Server
**IMPORTANT:** The `.env` file is only read when the server starts, so you must restart:
1. Stop your current server (`Ctrl + C`)
2. Start it again (`npm start` or `npm run dev`)

## What This Changes
- **Security**: New keys are more secure and support better rotation
- **Compatibility**: Your existing code will work without any changes
- **Future-proofing**: Ensures your app works with future Supabase updates

## Verification
After updating and restarting:
1. Check that your app loads without errors
2. Test the registration form to ensure it still works
3. Check the browser console for any API-related errors

## Timeline
- **Current**: Both old and new keys work
- **November 2025**: Migration strongly recommended
- **Late 2026**: Old keys will be deprecated

## Troubleshooting
If you encounter issues:
1. Double-check the key format (should start with `sb_publishable_`)
2. Ensure you copied the entire key without extra spaces
3. Verify the key is from the correct project
4. Restart your development server
