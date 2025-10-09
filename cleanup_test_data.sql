-- ========================================
-- CLEANUP SCRIPT - Clear All Test Data
-- ========================================
-- Run this to prepare for production/real event data
-- WARNING: This will delete ALL data from IPC tables!

-- Step 1: Clear all submissions
DELETE FROM public.ipc_submissions;

-- Step 2: Clear all IPC codes (reset is_used flags)
DELETE FROM public.ipc_codes;

-- Step 3: Reset ID sequences (optional - starts IDs from 1 again)
ALTER SEQUENCE ipc_submissions_id_seq RESTART WITH 1;
ALTER SEQUENCE ipc_codes_id_seq RESTART WITH 1;

-- Verify cleanup
SELECT 'ipc_codes' as table_name, COUNT(*) as row_count FROM public.ipc_codes
UNION ALL
SELECT 'ipc_submissions' as table_name, COUNT(*) as row_count FROM public.ipc_submissions;
