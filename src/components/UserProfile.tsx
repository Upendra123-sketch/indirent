
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, FileText, Edit3, LogOut, Download, Home } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface RentalAgreement {
  id: string;
  property_address: string;
  rent_amount: number;
  status: string;
  created_at: string;
  landlord_name: string;
  tenant_name: string;
}

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    email: user?.email || ''
  });
  const [agreements, setAgreements] = useState<RentalAgreement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAgreements();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          phone: data.phone || '',
          email: user?.email || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchAgreements = async () => {
    try {
      const { data, error } = await supabase
        .from('rental_agreements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAgreements(data || []);
    } catch (error) {
      console.error('Error fetching agreements:', error);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: profile.full_name,
          phone: profile.phone
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Profile updated successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Signed out",
        description: "You have been signed out.",
      });
      // Navigate anyway since we cleared local state
      navigate('/');
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const downloadAgreement = (agreement: RentalAgreement) => {
    // Create a simple text summary of the agreement
    const agreementData = `
Rental Agreement Summary
========================
Agreement ID: ${agreement.id}
Property Address: ${agreement.property_address}
Landlord: ${agreement.landlord_name}
Tenant: ${agreement.tenant_name}
Monthly Rent: ₹${agreement.rent_amount.toLocaleString()}
Status: ${agreement.status}
Created: ${new Date(agreement.created_at).toLocaleDateString()}
    `;

    const blob = new Blob([agreementData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agreement-${agreement.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 animate-fade-in flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">User Profile</h1>
            <p className="text-muted-foreground">Manage your account and rental agreements</p>
          </div>
          <Button
            variant="outline"
            onClick={handleHomeClick}
            className="hover-lift group"
          >
            <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Home
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-muted/50 rounded-lg p-1 animate-slide-up">
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('profile')}
            className="flex-1 transition-all duration-300 hover-lift"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant={activeTab === 'agreements' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('agreements')}
            className="flex-1 transition-all duration-300 hover-lift"
          >
            <FileText className="mr-2 h-4 w-4" />
            My Agreements
          </Button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card className="animate-scale-in hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Profile Information
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="hover-lift"
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    disabled={!isEditing}
                    className="transition-all duration-300"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profile.email}
                    disabled
                    className="bg-muted/50"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="transition-all duration-300"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-2 animate-fade-in">
                  <Button 
                    onClick={updateProfile} 
                    disabled={loading}
                    className="hover-lift"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              )}

              <Separator />

              <div className="pt-4">
                <Button
                  variant="destructive"
                  onClick={handleSignOut}
                  className="hover-lift group"
                >
                  <LogOut className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Agreements Tab */}
        {activeTab === 'agreements' && (
          <div className="space-y-4 animate-fade-in">
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  My Rental Agreements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {agreements.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No rental agreements found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {agreements.map((agreement, index) => (
                      <div 
                        key={agreement.id} 
                        className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover-lift animate-slide-up"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground">
                              {agreement.property_address}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <p><span className="font-medium">Landlord:</span> {agreement.landlord_name}</p>
                              <p><span className="font-medium">Tenant:</span> {agreement.tenant_name}</p>
                              <p><span className="font-medium">Rent:</span> ₹{agreement.rent_amount.toLocaleString()}</p>
                              <p><span className="font-medium">Status:</span> 
                                <span className={`ml-1 px-2 py-1 rounded text-xs ${
                                  agreement.status === 'pending' 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {agreement.status}
                                </span>
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Created: {new Date(agreement.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadAgreement(agreement)}
                            className="hover-lift group"
                          >
                            <Download className="mr-2 h-4 w-4 group-hover:translate-y-[-2px] transition-transform" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
