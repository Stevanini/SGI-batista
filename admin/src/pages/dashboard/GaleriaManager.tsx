import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import ImageCropUpload from '@/components/dashboard/ImageCropUpload';
import { Trash, Plus } from 'lucide-react';

interface ImageItem {
  id: string;
  image_url: string;
  created_at: string;
}

const GaleriaManager = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showNewImageForm, setShowNewImageForm] = useState(false);
  const [newImages, setNewImages] = useState<{ blob: Blob, url: string }[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('galeria')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setImages(data || []);
    } catch (error: unknown) {
      toast({
        title: 'Erro ao carregar imagens',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewImage = () => {
    setShowNewImageForm(true);
    setNewImages([]);
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);
    const images = files.map(file => ({ blob: file, url: URL.createObjectURL(file) }));
    setNewImages(images);
  };

  const handleSaveNewImages = async () => {
    if (!newImages.length) {
      toast({
        title: 'Erro',
        description: 'Selecione ao menos uma imagem antes de salvar.',
        variant: 'destructive',
      });
      return;
    }
    setUploading(true);
    try {
      for (const img of newImages) {
        const fileName = `${Math.random().toString(36).substring(2, 15)}.jpg`;
        const filePath = `galeria/${fileName}`;
        const { error } = await supabase.storage
          .from('admin-images')
          .upload(filePath, img.blob, {
            cacheControl: '3600',
            upsert: false,
          });
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage
          .from('admin-images')
          .getPublicUrl(filePath);
        const { error: dbError } = await supabase
          .from('galeria')
          .insert({ image_url: publicUrl });
        if (dbError) throw dbError;
      }
      toast({
        title: 'Imagens adicionadas',
        description: 'As imagens foram adicionadas com sucesso à galeria.',
      });
      setShowNewImageForm(false);
      setNewImages([]);
      fetchImages();
    } catch (error: unknown) {
      toast({
        title: 'Erro ao salvar imagens',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('galeria')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setImages(images.filter(img => img.id !== id));
      
      toast({
        title: 'Imagem excluída',
        description: 'A imagem foi removida com sucesso da galeria.',
      });
    } catch (error: unknown) {
      toast({
        title: 'Erro ao excluir imagem',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciamento da Galeria</h1>
        {!showNewImageForm && (
          <Button onClick={handleNewImage}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Imagem
          </Button>
        )}
      </div>
      
      {showNewImageForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Adicionar Novas Imagens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative pb-16">
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('multi-image-upload')?.click()}
                  className="mb-4"
                >
                  Selecionar Imagens
                </Button>
                <input
                  id="multi-image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFilesSelected}
                  className="hidden"
                />
                {newImages.length > 0 && (
                  <div className="text-sm text-gray-600 mb-2">{newImages.length} imagem(ns) selecionada(s)</div>
                )}
                <div className="flex flex-wrap gap-2">
                  {newImages.map((img, idx) => (
                    <img key={idx} src={img.url} alt="preview" className="w-32 h-24 object-cover rounded shadow" />
                  ))}
                </div>
              </div>
              <div className="flex items-end h-full w-full">
                <div className="absolute bottom-0 right-0 flex gap-2 w-full justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => { setShowNewImageForm(false); setNewImages([]); }}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleSaveNewImages}
                    disabled={uploading || !newImages.length}
                  >
                    {uploading ? 'Salvando...' : 'Salvar Imagens'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div>
          {images.length === 0 && !showNewImageForm ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Nenhuma imagem encontrada na galeria.</p>
              <Button onClick={handleNewImage}>
                Adicionar Primeira Imagem
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map(image => (
                <Card key={image.id} className="overflow-hidden">
                  <div className="relative aspect-[3/2]">
                    <img 
                      src={image.image_url} 
                      alt="Galeria" 
                      className="object-cover w-full h-full"
                    />
                    <Button 
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 rounded-full opacity-80 hover:opacity-100"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GaleriaManager;
