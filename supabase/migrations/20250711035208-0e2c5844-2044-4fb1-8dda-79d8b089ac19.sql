
-- Create a table for document uploads
CREATE TABLE public.rental_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rental_agreement_id UUID REFERENCES public.rental_agreements(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to rental_documents
ALTER TABLE public.rental_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for rental_documents
CREATE POLICY "Users can view their own documents" 
  ON public.rental_documents 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own documents" 
  ON public.rental_documents 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all documents" 
  ON public.rental_documents 
  FOR ALL 
  USING (EXISTS ( SELECT 1 FROM admin_users WHERE admin_users.email = auth.email()));

-- Create storage bucket for rental documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('rental-documents', 'rental-documents', false);

-- Create storage policies for rental documents
CREATE POLICY "Users can upload their own documents" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'rental-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own documents" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'rental-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all rental documents" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'rental-documents' AND EXISTS ( SELECT 1 FROM admin_users WHERE admin_users.email = auth.email()));
