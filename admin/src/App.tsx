import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import BannerManager from "./pages/dashboard/BannerManager";
import BazarManager from "./pages/dashboard/BazarManager";
import ReflexoesManager from "./pages/dashboard/ReflexoesManager";
import GaleriaManager from "./pages/dashboard/GaleriaManager";
import ContatoManager from "./pages/dashboard/ContatoManager";
import UserApprovalManager from './pages/dashboard/UserApprovalManager';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="banner" element={<BannerManager />} />
              <Route path="bazar" element={<BazarManager />} />
              <Route path="reflexoes" element={<ReflexoesManager />} />
              <Route path="galeria" element={<GaleriaManager />} />
              <Route path="contato" element={<ContatoManager />} />
              <Route path="usuarios" element={
                <AdminRoute>
                  <UserApprovalManager />
                </AdminRoute>
              } />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Componente de rota protegida para admin
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('user_profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        setIsAdmin(!!data?.is_admin);
        if (!data?.is_admin) navigate('/dashboard');
      }
    };
    if (!loading && user) fetchProfile();
    if (!loading && !user) navigate('/auth');
    // eslint-disable-next-line
  }, [user, loading, navigate]);

  if (loading || isAdmin === null) return null;
  return isAdmin ? <>{children}</> : null;
};

export default App;
