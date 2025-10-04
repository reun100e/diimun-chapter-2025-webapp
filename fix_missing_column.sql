-- Fix for the missing has_registered_esperanza column
-- Run this in Supabase SQL Editor

-- Add the missing column that your React form is trying to save
ALTER TABLE public.registrations
ADD COLUMN has_registered_esperanza text;

-- Add a comment to explain what this column stores
COMMENT ON COLUMN public.registrations.has_registered_esperanza IS 'Indicates if the user has registered for Esperanza (yes/no)';

-- Also add the missing columns for the payment URLs that your form is trying to save
ALTER TABLE public.registrations
ADD COLUMN mun_payment_photo_url text;

ALTER TABLE public.registrations
ADD COLUMN esperanza_payment_photo_url text;

ALTER TABLE public.registrations
ADD COLUMN registration_amount numeric;

-- Add comments for these new columns
COMMENT ON COLUMN public.registrations.mun_payment_photo_url IS 'URL of the MUN payment screenshot';
COMMENT ON COLUMN public.registrations.esperanza_payment_photo_url IS 'URL of the Esperanza payment screenshot (if applicable)';
COMMENT ON COLUMN public.registrations.registration_amount IS 'Amount paid for registration (649 for Esperanza special, 899 for regular)';

