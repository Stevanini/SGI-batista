import { useState, useEffect, createContext, useContext } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signIn: (email: string, password: string) => Promise<{
    error: AuthError | null;
    data: Session | null;
  }>;
  signUp: (email: string, password: string) => Promise<{
    error: AuthError | null;
    data: { user: User | null; session: Session | null };
  }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const response = await supabase.auth.signInWithPassword({ email, password });
    if (response.error || !response.data.session) {
      setLoading(false);
      return {
        data: response.data.session,
        error: response.error
      };
    }

    // Checagem de permissão
    const userId = response.data.session.user.id;
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('is_approved')
      .eq('id', userId)
      .single();

    // Se não existir perfil, cria automaticamente
    if (!profile) {
      await supabase.from('user_profiles').upsert({
        id: userId,
        is_approved: false,
        email: response.data.session.user.email
      });
      await supabase.auth.signOut();
      setLoading(false);
      return {
        data: null,
        error: { message: 'Aguardando aprovação do administrador.', name: 'PermissionDenied' } as AuthError
      };
    } else {
      // Atualiza o email se não estiver salvo
      await supabase.from('user_profiles').update({
        email: response.data.session.user.email
      }).eq('id', userId);
    }

    if (profileError || !profile.is_approved) {
      await supabase.auth.signOut();
      setLoading(false);
      return {
        data: null,
        error: { message: 'Aguardando aprovação do administrador.', name: 'PermissionDenied' } as AuthError
      };
    }

    setLoading(false);
    return {
      data: response.data.session,
      error: null
    };
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const response = await supabase.auth.signUp({ email, password });

    // Cria perfil com is_approved: false e salva o email
    if (response.data.user) {
      await supabase.from('user_profiles').insert({
        id: response.data.user.id,
        is_approved: false,
        email: response.data.user.email
      });
    }

    setLoading(false);
    return {
      data: {
        user: response.data.user,
        session: response.data.session
      },
      error: response.error
    };
  };

  const signOut = async () => {
    setLoading(true);
    const response = await supabase.auth.signOut();
    navigate('/auth');
    setLoading(false);
    return { error: response.error };
  };

  return (
    <AuthContext.Provider value={{ session, user, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
