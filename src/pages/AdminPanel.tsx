
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
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface RentalAgreement {
  id: string;
  property_address: string;
  rent_amount: number;
  status: string;
  created_at: string;
  landlord_name: string;
  tenant_name: string;
  landlord_email: string;
  tenant_email: string;
}

interface RentalDocument {
  id: string;
  document_type: string;
  file_name: string;
  file_size: number;
  file_url: string;
  uploaded_at: string;
  rental_agreement_id: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [agreements, setAgreements] = useState<RentalAgreement[]>([]);
  const [documents, setDocuments] = useState<RentalDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isAdmin) {
      // Add a small delay to show loading state, then redirect
      setTimeout(() => {
        navigate('/');
      }, 1000);
      return;
    }
    
    fetchData();
  }, [user, isAdmin, navigate]);

  const fetchData = async () => {
    try {
      // Fetch rental agreements
      const { data: agreementsData, error: agreementsError } = await supabase
        .from('rental_agreements')
        .select('*')
        .order('created_at', { ascending: false });

      if (agreementsError) throw agreementsError;
      setAgreements(agreementsData || []);

      // Fetch documents
      const { data: documentsData, error: documentsError } = await supabase
        .from('rental_documents')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (documentsError) throw documentsError;
      setDocuments(documentsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadDocument = async (documentItem: RentalDocument) => {
    try {
      const { data, error } = await supabase.storage
        .from('rental-documents')
        .download(documentItem.file_url.split('/').pop() || '');

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = documentItem.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Document downloaded successfully",
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Error",
        description: "Failed to download document",
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
                            <h3 className="font-semibold text-foreground mb-2">
                              {agreement.property_address}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Landlord</p>
                                <p className="font-medium">{agreement.landlord_name}</p>
                                <p className="text-xs text-muted-foreground">{agreement.landlord_email}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Tenant</p>
                                <p className="font-medium">{agreement.tenant_name}</p>
                                <p className="text-xs text-muted-foreground">{agreement.tenant_email}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Rent Amount</p>
                                <p className="font-medium text-lg text-primary">
                                  {formatCurrency(agreement.rent_amount)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
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
                        <div className="text-xs text-muted-foreground">
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
                        className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover-lift animate-slide-up"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-start space-x-3">
                            <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                            <div>
                              <h4 className="font-medium text-foreground">{documentItem.file_name}</h4>
                              <div className="text-sm text-muted-foreground space-y-1">
                                <p>Type: {documentItem.document_type}</p>
                                <p>Size: {formatFileSize(documentItem.file_size)}</p>
                                <p>Uploaded: {new Date(documentItem.uploaded_at).toLocaleDateString()}</p>
                                {documentItem.rental_agreement_id && (
                                  <p>Agreement ID: {documentItem.rental_agreement_id.substring(0, 8)}...</p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
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
