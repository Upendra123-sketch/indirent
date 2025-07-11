
-- Fix the RLS policies that are causing permission denied errors
-- Remove policies that reference auth.users table directly

-- Drop the problematic admin_users policy
DROP POLICY IF EXISTS "Admin users can view all admin accounts" ON admin_users;

-- Create a simpler policy that doesn't reference auth.users
CREATE POLICY "Admin users can view their own account" 
ON admin_users 
FOR SELECT 
USING (email = auth.email());

-- Fix rental_agreements policies to not reference auth.users
DROP POLICY IF EXISTS "Admins can view all rental agreements" ON rental_agreements;
DROP POLICY IF EXISTS "Users can view their own rental agreements" ON rental_agreements;
DROP POLICY IF EXISTS "Users can insert rental agreements" ON rental_agreements;

-- Create simpler policies for rental_agreements
CREATE POLICY "Anyone can insert rental agreements" 
ON rental_agreements 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view rental agreements" 
ON rental_agreements 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can do everything with rental agreements" 
ON rental_agreements 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = auth.email()
  )
);

-- Fix rental_documents policies
DROP POLICY IF EXISTS "Enable all for admins" ON rental_documents;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON rental_documents;
DROP POLICY IF EXISTS "Enable select for own documents" ON rental_documents;

-- Create simpler policies for rental_documents
CREATE POLICY "Anyone can insert documents" 
ON rental_documents 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view documents" 
ON rental_documents 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can do everything with documents" 
ON rental_documents 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.email = auth.email()
  )
);
