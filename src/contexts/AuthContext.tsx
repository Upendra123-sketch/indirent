
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  adminSignIn: (username: string, password: string) => Promise<{ error: any }>;
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
                setIsAdmin(false);
              } else {
                setIsAdmin(!!data);
                console.log('Admin status:', !!data);
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
      console.log('Attempting admin sign in with username:', username);
      
      // First get the admin user by username
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('username', username)
        .maybeSingle();

      console.log('Admin user lookup result:', { adminUser, adminError });

      if (adminError) {
        console.error('Admin lookup error:', adminError);
        return { error: { message: 'Authentication failed. Please check your credentials.' } };
      }

      if (!adminUser) {
        console.log('No admin user found for username:', username);
        return { error: { message: 'Invalid username or password' } };
      }

      console.log('Found admin user, attempting sign in with email:', adminUser.email);

      // Sign in using the admin's email
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminUser.email,
        password,
      });

      console.log('Admin sign in result:', { data, error });
      return { error };
    } catch (error) {
      console.error('Admin sign in error:', error);
      return { error: { message: 'Authentication failed. Please try again.' } };
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
    signUp,
    adminSignIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
