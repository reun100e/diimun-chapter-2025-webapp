-- Fix: Allow anonymous users to update the is_used field in ipc_codes table
-- This is needed so that after a successful submission, the code is marked as used

CREATE POLICY "Allow anon update is_used in ipc_codes" 
ON public.ipc_codes 
FOR UPDATE 
TO anon 
USING (true) 
WITH CHECK (true);
