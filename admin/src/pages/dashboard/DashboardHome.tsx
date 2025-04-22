
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Counts {
  banners: number;
  bazares: number;
  reflexoes: number;
  galerias: number;
}

const DashboardHome = () => {
  const [counts, setCounts] = useState<Counts>({
    banners: 0,
    bazares: 0,
    reflexoes: 0,
    galerias: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      
      try {
        // Fetch counts from each table
        const [bannerResult, bazarResult, reflexoesResult, galeriaResult] = await Promise.all([
          supabase.from('banner_images').select('id', { count: 'exact', head: true }),
          supabase.from('bazar_info').select('id', { count: 'exact', head: true }),
          supabase.from('reflexoes').select('id', { count: 'exact', head: true }),
          supabase.from('galeria').select('id', { count: 'exact', head: true }),
        ]);
        
        setCounts({
          banners: bannerResult.count || 0,
          bazares: bazarResult.count || 0,
          reflexoes: reflexoesResult.count || 0,
          galerias: galeriaResult.count || 0
        });
      } catch (error) {
        console.error('Erro ao buscar contagens:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCounts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Banners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.banners}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Bazares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.bazares}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reflexões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.reflexoes}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Imagens na Galeria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{counts.galerias}</div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Bem-vindo ao painel de administração</h2>
        <p className="text-gray-600">
          Use a navegação lateral para gerenciar os conteúdos do seu site. Aqui você pode gerenciar banners, 
          informações do bazar missionário, reflexões, galeria de imagens e informações de contato.
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
