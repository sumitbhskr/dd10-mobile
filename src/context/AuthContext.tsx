import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

type AuthContextType = {
  user: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const initAuth = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.log('Supabase session error:', error.message);
        setUser(null);
      } else {
        setUser(data?.session?.user ?? null);
      }
    } catch (err) {
      console.log('Auth init failed:', err);
      setUser(null);
    } finally {
      setLoading(false); 
    }
  };

  initAuth();

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setUser(session?.user ?? null);
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);


  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
