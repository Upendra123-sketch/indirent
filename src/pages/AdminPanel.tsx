
import { useState } from "react";
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
  Filter,
  Eye,
  Trash2
} from "lucide-react";

const AdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data - this would come from your database
  const rentalAgreements = [
    {
      id: "RA001",
      landlordName: "Rajesh Kumar",
      tenantName: "Priya Sharma",
      propertyAddress: "123 MG Road, Bangalore",
      rent: "₹25,000",
      createdDate: "2024-01-15",
      status: "Completed"
    },
    {
      id: "RA002",
      landlordName: "Amit Patel",
      tenantName: "Sneha Singh",
      propertyAddress: "456 Park Street, Mumbai",
      rent: "₹35,000",
      createdDate: "2024-01-14",
      status: "Pending"
    },
    {
      id: "RA003",
      landlordName: "Suresh Reddy",
      tenantName: "Ankit Gupta",
      propertyAddress: "789 Nehru Place, Delhi",
      rent: "₹28,000",
      createdDate: "2024-01-13",
      status: "Completed"
    }
  ];

  const stats = [
    {
      title: "Total Agreements",
      value: "1,234",
      icon: FileText,
      change: "+12%"
    },
    {
      title: "Active Users",
      value: "856",
      icon: Users,
      change: "+8%"
    },
    {
      title: "This Month",
      value: "89",
      icon: Calendar,
      change: "+23%"
    }
  ];

  const handleDownloadAll = () => {
    // This would generate and download a CSV/Excel file with all data
    console.log("Downloading all rental agreement data...");
    alert("Download functionality will be implemented with backend integration");
  };

  const handleDownloadSingle = (id: string) => {
    console.log(`Downloading agreement ${id}...`);
    alert(`Download functionality for ${id} will be implemented with backend integration`);
  };

  const filteredAgreements = rentalAgreements.filter(agreement => {
    const matchesSearch = agreement.landlordName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agreement.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agreement.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || agreement.status.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">RA</span>
              </div>
              <span className="text-xl font-bold text-foreground">Admin Panel</span>
            </div>
            
            <Button 
              onClick={handleDownloadAll}
              className="bg-primary hover:bg-primary/90"
            >
              <Download className="mr-2 h-4 w-4" />
              Download All Data
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-green-600">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
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
                  {filteredAgreements.map((agreement) => (
                    <TableRow key={agreement.id}>
                      <TableCell className="font-medium">{agreement.id}</TableCell>
                      <TableCell>{agreement.landlordName}</TableCell>
                      <TableCell>{agreement.tenantName}</TableCell>
                      <TableCell className="max-w-xs truncate">{agreement.propertyAddress}</TableCell>
                      <TableCell>{agreement.rent}</TableCell>
                      <TableCell>{agreement.createdDate}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          agreement.status === 'Completed' 
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
                            onClick={() => handleDownloadSingle(agreement.id)}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive hover:text-destructive"
                            onClick={() => console.log(`Delete ${agreement.id}`)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
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
