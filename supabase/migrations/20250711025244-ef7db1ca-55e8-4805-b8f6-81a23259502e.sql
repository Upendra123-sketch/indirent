
-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rental agreements table
CREATE TABLE public.rental_agreements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  landlord_name TEXT NOT NULL,
  landlord_email TEXT,
  landlord_phone TEXT,
  tenant_name TEXT NOT NULL,
  tenant_email TEXT,
  tenant_phone TEXT,
  property_address TEXT NOT NULL,
  property_type TEXT,
  rent_amount DECIMAL(10,2) NOT NULL,
  security_deposit DECIMAL(10,2),
  lease_start_date DATE,
  lease_end_date DATE,
  agreement_terms TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'pending'
);

-- Create user profiles table for regular users
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users (only admins can access)
CREATE POLICY "Admin users can view all admin accounts" 
  ON public.admin_users 
  FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.email()));

-- RLS Policies for rental_agreements (admins can see all, users can see their own)
CREATE POLICY "Admins can view all rental agreements" 
  ON public.rental_agreements 
  FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.email()));

CREATE POLICY "Users can view their own rental agreements" 
  ON public.rental_agreements 
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert rental agreements" 
  ON public.rental_agreements 
  FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert a default admin user (you should change these credentials)
INSERT INTO public.admin_users (username, email, password_hash) 
VALUES ('admin', 'admin@rentalagreement.com', crypt('admin123', gen_salt('bf')));
