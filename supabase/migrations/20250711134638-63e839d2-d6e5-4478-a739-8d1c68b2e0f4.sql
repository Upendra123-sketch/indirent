-- Create function to verify password using crypt
CREATE OR REPLACE FUNCTION verify_password(input_password TEXT, stored_hash TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN stored_hash = crypt(input_password, stored_hash);
END;
$$;