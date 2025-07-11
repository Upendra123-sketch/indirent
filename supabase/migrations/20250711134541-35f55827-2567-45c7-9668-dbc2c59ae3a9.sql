-- Insert admin user with username IndiRent and hashed password
INSERT INTO admin_users (username, email, password_hash) 
VALUES (
  'IndiRent', 
  'admin@indirent.com',
  crypt('Sky@#xyz123', gen_salt('bf'))
)
ON CONFLICT (email) DO UPDATE SET 
  username = EXCLUDED.username,
  password_hash = EXCLUDED.password_hash;