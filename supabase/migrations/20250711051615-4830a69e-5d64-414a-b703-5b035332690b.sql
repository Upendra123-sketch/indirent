
-- Check current RLS policies on rental_documents table
-- The issue might be that the RLS policy is trying to reference a non-existent 'users' table

-- Drop the existing problematic policy if it exists
DROP POLICY IF EXISTS "Users can upload their own documents" ON rental_documents;

-- Create a corrected policy that only references auth.uid() directly
CREATE POLICY "Users can upload their own documents" 
ON rental_documents 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Also ensure the SELECT policy is correct
DROP POLICY IF EXISTS "Users can view their own documents" ON rental_documents;

CREATE POLICY "Users can view their own documents" 
ON rental_documents 
FOR SELECT 
USING (auth.uid() = user_id);
