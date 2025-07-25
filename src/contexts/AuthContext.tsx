
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
  refreshSession: () => Promise<void>;
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
          // Check if user is admin - simplified approach
          setTimeout(async () => {
            try {
              // Check admin_users table for this email
              const { data, error } = await supabase
                .from('admin_users')
                .select('id, email')
                .eq('email', session.user.email)
                .maybeSingle();
              
              if (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
              } else {
                setIsAdmin(!!data);
                console.log('Admin status:', !!data, 'for email:', session.user.email);
              }
            } catch (error) {
              console.error('Error in admin check:', error);
              setIsAdmin(false);
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

      // Create admin session without going through Supabase auth
      const mockUser = {
        id: 'admin-user-' + Date.now(),
        email: adminData.email,
        user_metadata: { username: username },
        app_metadata: { role: 'admin' },
        aud: 'authenticated',
        role: 'authenticated',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as User;

      const mockSession = {
        access_token: 'admin-token-' + Date.now(),
        refresh_token: 'admin-refresh-' + Date.now(),
        expires_in: 86400, // 24 hours
        expires_at: Math.floor(Date.now() / 1000) + 86400,
        token_type: 'bearer',
        user: mockUser,
      } as Session;

      setSession(mockSession);
      setUser(mockUser);
      setIsAdmin(true);
      
      console.log('Admin sign in successful:', { user: mockUser });
      return { error: null };
    } catch (error) {
      console.error('Admin sign in error:', error);
      return { error: { message: 'Admin login failed' } };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out user...');
      
      // Clear admin state immediately for security
      setIsAdmin(false);
      
      // Only try to sign out from Supabase if it's not an admin session
      if (user?.id?.startsWith('admin-user-')) {
        console.log('Admin logout - clearing local state only');
      } else {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Sign out error:', error);
          throw error;
        }
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

  const refreshSession = async () => {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) {
      console.error('Error refreshing session:', error);
      await signOut(); // Sign out if refresh fails
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
      refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
