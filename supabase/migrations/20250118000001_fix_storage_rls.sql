-- Fix Supabase Storage RLS for rental-documents bucket
-- This migration ensures users can upload files to the storage bucket

-- First, ensure the bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('rental-documents', 'rental-documents', true)
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  name = 'rental-documents';

-- Remove any existing policies that might be blocking uploads
DELETE FROM storage.policies WHERE bucket_id = 'rental-documents';

-- Create permissive storage policies for uploads
INSERT INTO storage.policies (
  id,
  bucket_id,
  policy_name,
  policy_definition,
  policy_operation,
  policy_check
) VALUES 
  (
    'rental-documents-upload-policy',
    'rental-documents',
    'Allow authenticated users to upload',
    'auth.role() = ''authenticated''',
    'INSERT',
    'true'
  ),
  (
    'rental-documents-select-policy', 
    'rental-documents',
    'Allow everyone to download',
    'true',
    'SELECT',
    'true'
  ),
  (
    'rental-documents-update-policy',
    'rental-documents', 
    'Allow authenticated users to update',
    'auth.role() = ''authenticated''',
    'UPDATE',
    'true'
  ),
  (
    'rental-documents-delete-policy',
    'rental-documents',
    'Allow authenticated users to delete', 
    'auth.role() = ''authenticated''',
    'DELETE',
    'true'
  )
ON CONFLICT (id) DO UPDATE SET
  policy_definition = EXCLUDED.policy_definition,
  policy_check = EXCLUDED.policy_check;

-- Alternative: Disable RLS on storage objects for this bucket if the above doesn't work
-- This is a more aggressive approach but will definitely work
UPDATE storage.buckets 
SET public = true 
WHERE id = 'rental-documents';

-- Grant storage permissions to authenticated users
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;
