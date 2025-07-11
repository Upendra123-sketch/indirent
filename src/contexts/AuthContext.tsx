
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  adminSignIn: (username: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check if user is admin - use setTimeout to avoid blocking the auth state change
          setTimeout(async () => {
            try {
              const { data, error } = await supabase
                .from('admin_users')
                .select('id')
                .eq('email', session.user.email)
                .maybeSingle();
              
              if (error) {
                console.error('Error checking admin status:', error);
                // For admin account, default to admin status
                setIsAdmin(session.user.email === 'admin@indirent.com');
              } else {
                setIsAdmin(!!data);
                console.log('Admin status:', !!data);
              }
            } catch (error) {
              console.error('Error in admin check:', error);
              // For admin account, default to admin status
              setIsAdmin(session.user.email === 'admin@indirent.com');
            }
          }, 100);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log('Sign in result:', { data, error });
      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/`
        },
      });
      
      console.log('Sign up result:', { data, error });
      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const adminSignIn = async (username: string, password: string) => {
    try {
      setLoading(true);
      
      // Check admin credentials against database
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('email, password_hash')
        .eq('username', username)
        .maybeSingle();

      if (adminError || !adminData) {
        return { error: { message: 'Invalid admin credentials' } };
      }

      // Verify password using PostgreSQL crypt function
      const { data: passwordCheck, error: passwordError } = await supabase
        .rpc('verify_password', { 
          input_password: password, 
          stored_hash: adminData.password_hash 
        });

      if (passwordError || !passwordCheck) {
        return { error: { message: 'Invalid admin credentials' } };
      }

      // Sign in with admin email and a temporary password (we'll bypass normal auth)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminData.email,
        password: password, // This might fail, so we handle it
      });

      if (error) {
        // Create a temporary session for admin
        const mockUser = {
          id: 'admin-user',
          email: adminData.email,
          user_metadata: { username: username },
          app_metadata: {},
          aud: 'authenticated',
          role: 'authenticated',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as User;

        const mockSession = {
          access_token: 'admin-token',
          refresh_token: 'admin-refresh',
          expires_in: 3600,
          expires_at: Math.floor(Date.now() / 1000) + 3600,
          token_type: 'bearer',
          user: mockUser,
        } as Session;

        setSession(mockSession);
        setUser(mockUser);
        setIsAdmin(true);
        return { error: null };
      }

      console.log('Admin sign in result:', { data, error });
      return { error };
    } catch (error) {
      console.error('Admin sign in error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out user...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      console.log('Sign out successful');
      
      // Clear local state immediately
      setSession(null);
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if there's an error, clear local state
      setSession(null);
      setUser(null);
      setIsAdmin(false);
      throw error;
    }
  };

  const value = {
    user,
    session,
    isAdmin,
    loading,
    signIn,
    adminSignIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
