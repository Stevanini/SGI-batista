import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import ImageCropUpload from '@/components/dashboard/ImageCropUpload';
import { Trash, Edit, Plus } from 'lucide-react';

interface Reflexao {
  id: string;
  text: string;
  author_name: string;
  author_image_url: string;
  created_at: string;
}

const ReflexoesManager = () => {
  const [reflexoes, setReflexoes] = useState<Reflexao[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentReflexao, setCurrentReflexao] = useState<Reflexao | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [authorImage, setAuthorImage] = useState<{ blob: Blob | null, url: string | null }>({ blob: null, url: '' });

  useEffect(() => {
    fetchReflexoes();
  }, []);

  const fetchReflexoes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reflexoes')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setReflexoes(data || []);
    } catch (error) {
      toast({
        title: 'Erro ao carregar reflexões',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewReflexao = () => {
    setCurrentReflexao({
      id: '',
      text: '',
      author_name: '',
      author_image_url: 'https://placehold.co/150x150/png',
      created_at: new Date().toISOString()
    });
    setIsEditing(true);
  };

  const handleEditReflexao = (reflexao: Reflexao) => {
    setCurrentReflexao(reflexao);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reflexoes')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setReflexoes(reflexoes.filter(r => r.id !== id));
      
      toast({
        title: 'Reflexão excluída',
        description: 'A reflexão foi removida com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao excluir reflexão',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleChange = (field: keyof Reflexao, value: string) => {
    if (currentReflexao) {
      setCurrentReflexao({ ...currentReflexao, [field]: value });
    }
  };

  const handleAuthorImageCrop = (data: { blob: Blob, url: string }) => {
    if (currentReflexao) {
      setAuthorImage(data);
      setCurrentReflexao({ ...currentReflexao, author_image_url: data.url });
    }
  };

  const handleSubmit = async () => {
    if (!currentReflexao) return;
    
    // Validate
    if (!currentReflexao.text || !currentReflexao.author_name || !currentReflexao.author_image_url) {
      toast({
        title: 'Erro de validação',
        description: 'Todos os campos são obrigatórios.',
        variant: 'destructive',
      });
      return;
    }
    
    if (currentReflexao.text.length > 400) {
      toast({
        title: 'Texto muito longo',
        description: 'O texto da reflexão deve ter no máximo 400 caracteres.',
        variant: 'destructive',
      });
      return;
    }
    
    setSaving(true);
    try {
      let imageUrl = currentReflexao.author_image_url;
      if (authorImage && authorImage.blob) {
        const fileName = `${Math.random().toString(36).substring(2, 15)}.jpg`;
        const filePath = `reflexoes/authors/${currentReflexao.id || 'new'}/${fileName}`;
        const { data, error } = await supabase.storage
          .from('admin-images')
          .upload(filePath, authorImage.blob, {
            cacheControl: '3600',
            upsert: false,
          });
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage
          .from('admin-images')
          .getPublicUrl(filePath);
        imageUrl = publicUrl;
      }
      
      let result;
      
      if (currentReflexao.id) {
        // Update
        result = await supabase
          .from('reflexoes')
          .update({
            text: currentReflexao.text,
            author_name: currentReflexao.author_name,
            author_image_url: imageUrl
          })
          .eq('id', currentReflexao.id);
      } else {
        // Insert
        result = await supabase
          .from('reflexoes')
          .insert({
            text: currentReflexao.text,
            author_name: currentReflexao.author_name,
            author_image_url: imageUrl
          });
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: currentReflexao.id ? 'Reflexão atualizada' : 'Reflexão criada',
        description: 'A operação foi concluída com sucesso!',
      });
      
      setIsEditing(false);
      fetchReflexoes();
      setAuthorImage({ blob: null, url: imageUrl });
    } catch (error) {
      toast({
        title: 'Erro ao salvar reflexão',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Reflexões</h1>
        {!isEditing && (
          <Button onClick={handleNewReflexao}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Reflexão
          </Button>
        )}
      </div>
      
      {loading && !isEditing ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : isEditing ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{currentReflexao?.id ? 'Editar' : 'Nova'} Reflexão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative pb-16">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="text">Texto da Reflexão</Label>
                  <textarea
                    id="text"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    value={currentReflexao?.text || ''}
                    onChange={(e) => handleChange('text', e.target.value)}
                    maxLength={400}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {currentReflexao?.text.length || 0}/400 caracteres
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="author_name">Nome do Autor</Label>
                  <Input
                    id="author_name"
                    value={currentReflexao?.author_name || ''}
                    onChange={(e) => handleChange('author_name', e.target.value)}
                  />
                </div>
              </div>
              <div className='md:max-w-[400px]'>
                <Label>Imagem do Autor</Label>
                <ImageCropUpload 
                  bucketName="admin-images"
                  path={`reflexoes/authors/${currentReflexao?.id || 'new'}`}
                  onSuccess={handleAuthorImageCrop}
                  currentImage={currentReflexao?.author_image_url}
                  aspectRatio={1}
                  cropWidth={400}
                  cropHeight={400}
                  className="mb-4"
                />
              </div>
              <div className="absolute bottom-0 right-0 flex gap-2 w-full justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={saving}
                >
                  {saving ? 'Salvando...' : 'Salvar Reflexão'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>
          {reflexoes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Nenhuma reflexão encontrada.</p>
              <Button onClick={handleNewReflexao}>
                Criar Nova Reflexão
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
              {reflexoes.map(reflexao => (
                <Card key={reflexao.id} className="overflow-hidden relative">
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditReflexao(reflexao)}
                    >
                      <Edit className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(reflexao.id)}
                    >
                      <Trash className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                  <div className="flex flex-col items-center p-6 pb-12">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border border-gray-200 bg-white">
                      <img 
                        src={reflexao.author_image_url} 
                        alt={reflexao.author_name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <p className="text-lg mb-2 text-center">{reflexao.text}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full text-center bg-white/80 py-2">
                    <span className="text-sm font-semibold">— {reflexao.author_name}</span>
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

export default ReflexoesManager;
