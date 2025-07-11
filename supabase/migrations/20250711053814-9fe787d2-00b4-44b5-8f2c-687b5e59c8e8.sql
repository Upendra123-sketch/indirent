
-- First, let's check if there are any triggers on the rental_documents table that might be causing issues
SELECT trigger_name, event_manipulation, action_statement 
FROM information_schema.triggers 
WHERE event_object_table = 'rental_documents';

-- Check if there are any functions that might be referenced by triggers
SELECT routine_name, routine_definition 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE '%rental_documents%';

-- Let's also check the current RLS policies to see what's actually there
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'rental_documents';

-- Drop all existing policies on rental_documents to start fresh
DROP POLICY IF EXISTS "Users can upload their own documents" ON rental_documents;
DROP POLICY IF EXISTS "Users can view their own documents" ON rental_documents;
DROP POLICY IF EXISTS "Admins can view all documents" ON rental_documents;

-- Recreate the policies with explicit, simple conditions
CREATE POLICY "Enable insert for authenticated users" 
ON rental_documents 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable select for own documents" 
ON rental_documents 
FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Enable all for admins" 
ON rental_documents 
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = auth.email()
  )
);
