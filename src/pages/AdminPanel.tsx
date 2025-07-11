
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Users, 
  Download, 
  Eye, 
  Calendar,
  DollarSign,
  TrendingUp,
  ArrowLeft,
  Image as ImageIcon,
  FileImage
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface RentalAgreement {
  id: string;
  property_address: string;
  property_type: string;
  rent_amount: number;
  security_deposit: number;
  lease_start_date: string;
  lease_end_date: string;
  agreement_terms: string;
  status: string;
  created_at: string;
  landlord_name: string;
  landlord_email: string;
  landlord_phone: string;
  tenant_name: string;
  tenant_email: string;
  tenant_phone: string;
}

interface RentalDocument {
  id: string;
  document_type: string;
  file_name: string;
  file_size: number;
  file_url: string;
  uploaded_at: string;
  rental_agreement_id: string;
  rental_agreements?: {
    property_address: string;
    landlord_name: string;
    tenant_name: string;
  };
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [agreements, setAgreements] = useState<RentalAgreement[]>([]);
  const [documents, setDocuments] = useState<RentalDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    } else if (user && !isAdmin) {
      // User is logged in but not admin, show access denied
      setLoading(false);
    }
    // If user is null, keep loading to wait for auth state
  }, [user, isAdmin]);

  const fetchData = async () => {
    try {
      console.log('Admin fetching data, user:', user, 'isAdmin:', isAdmin);
      
      if (!user || !isAdmin) {
        console.error('Not authorized to fetch admin data');
        throw new Error('Not authorized to access admin data');
      }

      // Fetch rental agreements with all data
      const { data: agreementsData, error: agreementsError } = await supabase
        .from('rental_agreements')
        .select('*')
        .order('created_at', { ascending: false });

      if (agreementsError) {
        console.error('Agreements fetch error:', agreementsError);
        throw agreementsError;
      }
      
      console.log('Fetched agreements:', agreementsData);
      setAgreements(agreementsData || []);

      // Fetch documents with rental agreement info
      const { data: documentsData, error: documentsError } = await supabase
        .from('rental_documents')
        .select(`
          *,
          rental_agreements!inner(
            property_address,
            landlord_name,
            tenant_name
          )
        `)
        .order('uploaded_at', { ascending: false });

      if (documentsError) {
        console.error('Documents fetch error:', documentsError);
        throw documentsError;
      }
      
      console.log('Fetched documents:', documentsData);
      setDocuments(documentsData || []);

    } catch (error: any) {
      console.error('Error fetching data:', error);
      
      let errorMessage = "Failed to fetch data. Please try again.";
      if (error?.code === '42501') {
        errorMessage = "Permission denied. Please check admin privileges.";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadDocument = async (documentItem: RentalDocument) => {
    try {
      // Extract the file path from the URL or use the stored path
      let filePath = documentItem.file_url;
      
      // If the file_url is a full URL, extract just the file path
      if (filePath.startsWith('http')) {
        const urlParts = filePath.split('/');
        const bucketIndex = urlParts.findIndex(part => part === 'rental-documents');
        if (bucketIndex !== -1 && urlParts[bucketIndex + 1]) {
          filePath = urlParts.slice(bucketIndex + 1).join('/');
        }
      }

      console.log('Downloading file from path:', filePath);

      // Download from Supabase storage
      const { data, error } = await supabase.storage
        .from('rental-documents')
        .download(filePath);

      if (error) {
        console.error('Storage download error:', error);
        // Fallback: try to fetch directly from URL
        const response = await fetch(documentItem.file_url);
        if (!response.ok) throw new Error('Failed to fetch file');
        const blob = await response.blob();
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = documentItem.file_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        // Success: create download link
        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = documentItem.file_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      toast({
        title: "Success",
        description: "Document downloaded successfully",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error", 
        description: "Failed to download document. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateAgreementStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('rental_agreements')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setAgreements(prev => 
        prev.map(agreement => 
          agreement.id === id ? { ...agreement, status } : agreement
        )
      );

      toast({
        title: "Success",
        description: "Agreement status updated successfully",
      });
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have permission to access this page.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const totalRevenue = agreements.reduce((sum, agreement) => sum + agreement.rent_amount, 0);
  const pendingAgreements = agreements.filter(a => a.status === 'pending').length;
  const completedAgreements = agreements.filter(a => a.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="p-2 hover-lift"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold text-gray-800">Admin Panel</span>
              </div>
            </div>
            <Badge variant="secondary" className="animate-float">
              <Users className="mr-1 h-3 w-3" />
              Admin Access
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover-lift animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Agreements</p>
                  <p className="text-2xl font-bold text-foreground">{agreements.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slide-up" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingAgreements}</p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slide-up" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedAgreements}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-slide-up" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(totalRevenue)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="agreements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 animate-fade-in">
            <TabsTrigger value="agreements" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Rental Agreements
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>

          {/* Agreements Tab */}
          <TabsContent value="agreements" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>All Rental Agreements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agreements.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No rental agreements found</p>
                    </div>
                  ) : (
                     agreements.map((agreement, index) => (
                       <div 
                         key={agreement.id} 
                         className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover-lift animate-slide-up"
                         style={{animationDelay: `${index * 0.1}s`}}
                       >
                         <div className="flex justify-between items-start mb-4">
                           <div className="flex-1">
                             <h3 className="font-semibold text-foreground mb-4 text-lg">
                               {agreement.property_address}
                             </h3>
                             
                             {/* Property Details */}
                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                               <div className="space-y-2">
                                 <h4 className="font-medium text-primary">Property Information</h4>
                                 <div className="text-sm space-y-1">
                                   <p><span className="font-medium text-muted-foreground">Type:</span> {agreement.property_type || 'N/A'}</p>
                                   <p><span className="font-medium text-muted-foreground">Address:</span> {agreement.property_address}</p>
                                   <p><span className="font-medium text-muted-foreground">Rent:</span> <span className="text-primary font-bold">{formatCurrency(agreement.rent_amount)}</span></p>
                                   <p><span className="font-medium text-muted-foreground">Security Deposit:</span> {agreement.security_deposit ? formatCurrency(agreement.security_deposit) : 'N/A'}</p>
                                 </div>
                               </div>
                               
                               <div className="space-y-2">
                                 <h4 className="font-medium text-primary">Landlord Details</h4>
                                 <div className="text-sm space-y-1">
                                   <p><span className="font-medium text-muted-foreground">Name:</span> {agreement.landlord_name}</p>
                                   <p><span className="font-medium text-muted-foreground">Email:</span> {agreement.landlord_email || 'N/A'}</p>
                                   <p><span className="font-medium text-muted-foreground">Phone:</span> {agreement.landlord_phone || 'N/A'}</p>
                                 </div>
                               </div>
                               
                               <div className="space-y-2">
                                 <h4 className="font-medium text-primary">Tenant Details</h4>
                                 <div className="text-sm space-y-1">
                                   <p><span className="font-medium text-muted-foreground">Name:</span> {agreement.tenant_name}</p>
                                   <p><span className="font-medium text-muted-foreground">Email:</span> {agreement.tenant_email || 'N/A'}</p>
                                   <p><span className="font-medium text-muted-foreground">Phone:</span> {agreement.tenant_phone || 'N/A'}</p>
                                 </div>
                               </div>
                             </div>
                             
                             {/* Lease Details */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                               <div className="space-y-2">
                                 <h4 className="font-medium text-primary">Lease Period</h4>
                                 <div className="text-sm space-y-1">
                                   <p><span className="font-medium text-muted-foreground">Start Date:</span> {agreement.lease_start_date ? new Date(agreement.lease_start_date).toLocaleDateString() : 'N/A'}</p>
                                   <p><span className="font-medium text-muted-foreground">End Date:</span> {agreement.lease_end_date ? new Date(agreement.lease_end_date).toLocaleDateString() : 'N/A'}</p>
                                 </div>
                               </div>
                               
                               <div className="space-y-2">
                                 <h4 className="font-medium text-primary">Agreement Terms</h4>
                                 <div className="text-sm">
                                   <p className="text-muted-foreground">{agreement.agreement_terms || 'No specific terms provided'}</p>
                                 </div>
                               </div>
                             </div>
                           </div>
                           
                           <div className="flex flex-col items-end space-y-2 ml-4">
                             <Badge 
                               variant={agreement.status === 'pending' ? 'secondary' : 'default'}
                               className="mb-2"
                             >
                               {agreement.status}
                             </Badge>
                             <div className="flex space-x-2">
                               {agreement.status === 'pending' && (
                                 <Button
                                   size="sm"
                                   onClick={() => updateAgreementStatus(agreement.id, 'completed')}
                                   className="hover-lift"
                                 >
                                   Mark Complete
                                 </Button>
                               )}
                             </div>
                           </div>
                         </div>
                         
                         <div className="text-xs text-muted-foreground border-t pt-2">
                           Created: {new Date(agreement.created_at).toLocaleDateString()} • 
                           ID: {agreement.id.substring(0, 8)}...
                         </div>
                       </div>
                     ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Download className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No documents found</p>
                    </div>
                  ) : (
                     documents.map((documentItem, index) => (
                       <div 
                         key={documentItem.id} 
                         className="p-6 border rounded-lg hover:shadow-lg transition-all duration-300 hover-lift animate-slide-up bg-white"
                         style={{animationDelay: `${index * 0.1}s`}}
                       >
                         <div className="flex gap-6">
                           {/* Image Preview Section */}
                           <div className="flex-shrink-0">
                             {documentItem.file_name.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                               <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden border">
                                 <img 
                                   src={documentItem.file_url} 
                                   alt={documentItem.file_name}
                                   className="w-full h-full object-cover"
                                   onError={(e) => {
                                     const target = e.target as HTMLImageElement;
                                     target.style.display = 'none';
                                     target.nextElementSibling?.classList.remove('hidden');
                                   }}
                                 />
                                 <div className="hidden w-full h-full flex items-center justify-center">
                                   <ImageIcon className="h-8 w-8 text-gray-400" />
                                 </div>
                               </div>
                             ) : (
                               <div className="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center border">
                                 <FileImage className="h-8 w-8 text-gray-400" />
                               </div>
                             )}
                           </div>
                           
                           {/* Document Information */}
                           <div className="flex-1">
                             <div className="flex justify-between items-start mb-4">
                               <div>
                                 <h4 className="font-semibold text-foreground text-lg mb-2">{documentItem.file_name}</h4>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div className="space-y-2">
                                     <h5 className="font-medium text-primary">Document Details</h5>
                                     <div className="text-sm text-muted-foreground space-y-1">
                                       <p><span className="font-medium">Type:</span> {documentItem.document_type}</p>
                                       <p><span className="font-medium">Size:</span> {formatFileSize(documentItem.file_size)}</p>
                                       <p><span className="font-medium">Uploaded:</span> {new Date(documentItem.uploaded_at).toLocaleDateString()}</p>
                                     </div>
                                   </div>
                                   
                                   {documentItem.rental_agreements && (
                                     <div className="space-y-2">
                                       <h5 className="font-medium text-primary">Related Agreement</h5>
                                       <div className="text-sm text-muted-foreground space-y-1">
                                         <p><span className="font-medium">Property:</span> {documentItem.rental_agreements.property_address}</p>
                                         <p><span className="font-medium">Landlord:</span> {documentItem.rental_agreements.landlord_name}</p>
                                         <p><span className="font-medium">Tenant:</span> {documentItem.rental_agreements.tenant_name}</p>
                                       </div>
                                     </div>
                                   )}
                                   
                                   {documentItem.rental_agreement_id && !documentItem.rental_agreements && (
                                     <div className="space-y-2">
                                       <h5 className="font-medium text-primary">Agreement ID</h5>
                                       <p className="text-sm text-muted-foreground">{documentItem.rental_agreement_id.substring(0, 8)}...</p>
                                     </div>
                                   )}
                                 </div>
                               </div>
                               
                               <div className="flex space-x-2">
                                 <Button
                                   variant="outline"
                                   size="sm"
                                   onClick={() => window.open(documentItem.file_url, '_blank')}
                                   className="hover-lift group"
                                 >
                                   <Eye className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                   View
                                 </Button>
                                 <Button
                                   variant="default"
                                   size="sm"
                                   onClick={() => downloadDocument(documentItem)}
                                   className="hover-lift group"
                                 >
                                   <Download className="mr-2 h-4 w-4 group-hover:translate-y-[-2px] transition-transform" />
                                   Download
                                 </Button>
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
