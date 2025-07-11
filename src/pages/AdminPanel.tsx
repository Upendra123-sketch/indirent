
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Download, 
  Users, 
  FileText, 
  Calendar, 
  Search,
  Eye,
  Trash2,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface RentalAgreement {
  id: string;
  landlord_name: string;
  tenant_name: string;
  property_address: string;
  rent_amount: number;
  created_at: string;
  status: string;
  landlord_email?: string;
  tenant_email?: string;
  landlord_phone?: string;
  tenant_phone?: string;
  security_deposit?: number;
  lease_start_date?: string;
  lease_end_date?: string;
  property_type?: string;
  agreement_terms?: string;
}

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [rentalAgreements, setRentalAgreements] = useState<RentalAgreement[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    thisMonth: 0
  });

  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    fetchRentalAgreements();
  }, [user, isAdmin, navigate]);

  const fetchRentalAgreements = async () => {
    try {
      const { data, error } = await supabase
        .from('rental_agreements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRentalAgreements(data || []);
      
      // Calculate stats
      const total = data?.length || 0;
      const completed = data?.filter(item => item.status === 'completed').length || 0;
      const pending = data?.filter(item => item.status === 'pending').length || 0;
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const thisMonth = data?.filter(item => {
        const createdDate = new Date(item.created_at);
        return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
      }).length || 0;

      setStats({ total, completed, pending, thisMonth });
    } catch (error) {
      console.error('Error fetching rental agreements:', error);
      toast({
        title: "Error",
        description: "Failed to fetch rental agreements",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAll = () => {
    const csvContent = generateCSV(rentalAgreements);
    downloadCSV(csvContent, 'all-rental-agreements.csv');
  };

  const handleDownloadSingle = (agreement: RentalAgreement) => {
    const csvContent = generateCSV([agreement]);
    downloadCSV(csvContent, `rental-agreement-${agreement.id}.csv`);
  };

  const generateCSV = (data: RentalAgreement[]) => {
    const headers = [
      'Agreement ID', 'Landlord Name', 'Landlord Email', 'Landlord Phone',
      'Tenant Name', 'Tenant Email', 'Tenant Phone', 'Property Address',
      'Property Type', 'Rent Amount', 'Security Deposit', 'Lease Start Date',
      'Lease End Date', 'Status', 'Created Date', 'Agreement Terms'
    ];

    const csvRows = [
      headers.join(','),
      ...data.map(item => [
        item.id,
        item.landlord_name,
        item.landlord_email || '',
        item.landlord_phone || '',
        item.tenant_name,
        item.tenant_email || '',
        item.tenant_phone || '',
        `"${item.property_address}"`,
        item.property_type || '',
        item.rent_amount,
        item.security_deposit || '',
        item.lease_start_date || '',
        item.lease_end_date || '',
        item.status,
        new Date(item.created_at).toLocaleDateString(),
        `"${item.agreement_terms || ''}"`
      ].join(','))
    ];

    return csvRows.join('\n');
  };

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this rental agreement?')) return;

    try {
      const { error } = await supabase
        .from('rental_agreements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Rental agreement deleted successfully",
      });
      
      fetchRentalAgreements();
    } catch (error) {
      console.error('Error deleting rental agreement:', error);
      toast({
        title: "Error",
        description: "Failed to delete rental agreement",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const filteredAgreements = rentalAgreements.filter(agreement => {
    const matchesSearch = agreement.landlord_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agreement.tenant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agreement.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || agreement.status.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">RA</span>
              </div>
              <span className="text-xl font-bold text-foreground">Admin Panel</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleDownloadAll}
                className="bg-primary hover:bg-primary/90"
              >
                <Download className="mr-2 h-4 w-4" />
                Download All Data
              </Button>
              <Button 
                variant="outline"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Agreements
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.thisMonth}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Rental Agreements Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by landlord, tenant, or agreement ID..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <Label htmlFor="filter">Filter by Status</Label>
                <select
                  id="filter"
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Data Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agreement ID</TableHead>
                    <TableHead>Landlord</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Rent</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredAgreements.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        No rental agreements found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAgreements.map((agreement) => (
                      <TableRow key={agreement.id}>
                        <TableCell className="font-medium">{agreement.id.slice(0, 8)}...</TableCell>
                        <TableCell>{agreement.landlord_name}</TableCell>
                        <TableCell>{agreement.tenant_name}</TableCell>
                        <TableCell className="max-w-xs truncate">{agreement.property_address}</TableCell>
                        <TableCell>₹{agreement.rent_amount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(agreement.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            agreement.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {agreement.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => console.log(`View ${agreement.id}`)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownloadSingle(agreement)}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(agreement.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
