import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ImageCropUpload from '@/components/dashboard/ImageCropUpload';
import { toast } from '@/hooks/use-toast';
import { Trash } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  image_url: string;
  description: string;
}

const BannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingBanner, setSavingBanner] = useState<string | null>(null);
  const [bannerImages, setBannerImages] = useState<Record<string, { blob: Blob | null, url: string | null }>>({});

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('banner_images')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setBanners(data || []);
    } catch (error: unknown) {
      toast({
        title: 'Erro ao carregar banners',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (id: string, title: string) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, title } : banner
    ));
  };

  const handleDescriptionChange = (id: string, description: string) => {
    setBanners(banners.map(banner =>
      banner.id === id ? { ...banner, description } : banner
    ));
  };

  const handleImageCrop = (id: string, data: { blob: Blob, url: string }) => {
    setBannerImages(prev => ({ ...prev, [id]: data }));
    setBanners(banners.map(banner => banner.id === id ? { ...banner, image_url: data.url } : banner));
  };

  const saveBanner = async (banner: Banner) => {
    setSavingBanner(banner.id);
    try {
      let imageUrl = banner.image_url;
      const imageData = bannerImages[banner.id];
      if (imageData && imageData.blob) {
        // Upload a nova imagem
        const fileName = `${Math.random().toString(36).substring(2, 15)}.jpg`;
        const filePath = `banners/${banner.id}/${fileName}`;
        const { data, error } = await supabase.storage
          .from('admin-images')
          .upload(filePath, imageData.blob, {
            cacheControl: '3600',
            upsert: false,
          });
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage
          .from('admin-images')
          .getPublicUrl(filePath);
        imageUrl = publicUrl;
      }
      const { error } = await supabase
        .from('banner_images')
        .update({ title: banner.title, image_url: imageUrl, description: banner.description })
        .eq('id', banner.id);
      if (error) throw error;
      toast({
        title: 'Banner atualizado',
        description: 'As alterações foram salvas com sucesso!',
      });
      setBannerImages(prev => ({ ...prev, [banner.id]: { blob: null, url: imageUrl } }));
      setBanners(prev => prev.map(b => b.id === banner.id ? { ...b, title: banner.title, image_url: imageUrl, description: banner.description } : b));
    } catch (error: unknown) {
      toast({
        title: 'Erro ao salvar banner',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSavingBanner(null);
    }
  };

  const addNewBanner = async () => {
    if (banners.length >= 3) {
      toast({
        title: 'Limite atingido',
        description: 'Você já possui o máximo de 3 banners.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('banner_images')
        .insert({ 
          title: 'Novo Banner', 
          image_url: 'https://placehold.co/1200x400/png',
          description: ''
        })
        .select();
        
      if (error) throw error;
      
      toast({
        title: 'Banner adicionado',
        description: 'Um novo banner foi adicionado.',
      });
      
      fetchBanners();
    } catch (error: unknown) {
      toast({
        title: 'Erro ao adicionar banner',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  const deleteBanner = async (id: string) => {
    try {
      const { error } = await supabase
        .from('banner_images')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setBanners(banners.filter(banner => banner.id !== id));
      
      toast({
        title: 'Banner excluído',
        description: 'O banner foi removido com sucesso.',
      });
    } catch (error: unknown) {
      toast({
        title: 'Erro ao excluir banner',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Banner</h1>
        <Button onClick={addNewBanner} disabled={banners.length >= 3}>
          Adicionar Banner ({banners.length}/3)
        </Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {banners.map(banner => (
            <Card key={banner.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Banner</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => deleteBanner(banner.id)}
                  >
                    <Trash className="h-5 w-5 text-red-500" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="w-full flex flex-col justify-center md:max-w-md md:mx-auto">
                    <ImageCropUpload 
                      bucketName="admin-images"
                      path={`banners/${banner.id}`}
                      onSuccess={(data) => handleImageCrop(banner.id, data)}
                      currentImage={banner.image_url}
                      className="w-full !p-2"
                      aspectRatio={16/9}
                      cropWidth={1920}
                      cropHeight={1080}
                    />
                  </div>
                  <div className="flex flex-col h-full w-full gap-4 relative pb-16">
                    <div>
                      <Label htmlFor={`title-${banner.id}`}>Título do Banner</Label>
                      <Input
                        id={`title-${banner.id}`}
                        value={banner.title}
                        onChange={(e) => handleTitleChange(banner.id, e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`description-${banner.id}`}>Descrição do Banner</Label>
                      <Input
                        id={`description-${banner.id}`}
                        value={banner.description || ''}
                        onChange={(e) => handleDescriptionChange(banner.id, e.target.value)}
                        maxLength={120}
                        placeholder="Digite uma breve descrição para o banner"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full flex justify-end p-0">
                      <Button 
                        onClick={() => saveBanner(banner)} 
                        disabled={savingBanner === banner.id}
                        className="w-full md:w-auto min-w-[180px]"
                      >
                        {savingBanner === banner.id ? 'Salvando...' : 'Salvar Alterações'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerManager;