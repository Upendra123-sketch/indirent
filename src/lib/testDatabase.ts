import { supabase } from '@/integrations/supabase/client';

// Simple test function to check database connectivity and RLS
export const testDatabaseAccess = async () => {
  try {
    console.log('Testing database access...');
    
    // Check authentication status
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('Auth session:', session?.user?.id, sessionError);
    
    // Try to select from rental_documents (should work with current RLS)
    const { data: selectData, error: selectError } = await supabase
      .from('rental_documents')
      .select('*')
      .limit(5);
    
    console.log('Select test:', selectData, selectError);
    
    // Try a simple insert test
    if (session?.user) {
      const { data: insertData, error: insertError } = await supabase
        .from('rental_documents')
        .insert({
          document_type: 'Test Document',
          file_name: 'test.jpg',
          file_size: 12345,
          file_url: 'https://example.com/test.jpg',
          user_id: session.user.id,
        })
        .select()
        .single();
      
      console.log('Insert test:', insertData, insertError);
      
      // Clean up test record if successful
      if (insertData?.id) {
        await supabase
          .from('rental_documents')
          .delete()
          .eq('id', insertData.id);
        console.log('Cleaned up test record');
      }
    }
    
  } catch (error) {
    console.error('Database test error:', error);
  }
};
