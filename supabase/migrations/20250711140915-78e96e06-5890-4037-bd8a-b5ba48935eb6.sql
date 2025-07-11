-- Add admin user with email indirent05@gmail.com
INSERT INTO public.admin_users (username, email, password_hash)
VALUES (
  'indirent05', 
  'indirent05@gmail.com', 
  crypt('Sky@#xyz123', gen_salt('bf'))
)
ON CONFLICT (email) DO NOTHING;