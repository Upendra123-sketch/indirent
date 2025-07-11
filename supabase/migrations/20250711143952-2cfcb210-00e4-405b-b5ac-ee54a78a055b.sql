-- Ensure admin user exists with correct credentials
INSERT INTO admin_users (username, email, password_hash) 
VALUES ('admin', 'indirent05@gmail.com', crypt('admin123', gen_salt('bf')))
ON CONFLICT (email) DO UPDATE SET 
  username = EXCLUDED.username,
  password_hash = EXCLUDED.password_hash;