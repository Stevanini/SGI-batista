import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, signOut } = useAuth();
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPermission = async () => {
      if (!loading && user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('is_approved')
          .eq('id', user.id)
          .single();
        if (!profile?.is_approved) {
          await signOut();
          navigate('/auth');
        } else {
          setChecking(false);
        }
      } else if (!loading && !user) {
        navigate('/auth');
      }
    };
    checkPermission();
    // eslint-disable-next-line
  }, [user, loading, navigate]);

  if (loading || checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
