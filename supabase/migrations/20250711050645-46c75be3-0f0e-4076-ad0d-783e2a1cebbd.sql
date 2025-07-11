
-- Fix the infinite recursion in admin_users RLS policy
DROP POLICY IF EXISTS "Admin users can view all admin accounts" ON admin_users;

-- Create a simpler, non-recursive policy for admin users
CREATE POLICY "Admin users can view all admin accounts" 
ON admin_users 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE auth.users.email = admin_users.email 
    AND auth.users.id = auth.uid()
  )
);
