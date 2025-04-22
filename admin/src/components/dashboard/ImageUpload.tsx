import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Image } from 'lucide-react';

interface ImageUploadProps {
  bucketName: string;
  path: string;
  onSuccess: (url: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload = ({ bucketName, path, onSuccess, currentImage, className }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    setUploading(true);
    
    try {
      // Create a preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${path}/${fileName}`;
      
      // Upload the file
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });
      
      if (error) throw error;
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
      
      onSuccess(publicUrl);
      toast({
        title: 'Upload concluído',
        description: 'Imagem enviada com sucesso!',
      });
    } catch (error: any) {
      toast({
        title: 'Erro no upload',
        description: error.message || 'Ocorreu um erro ao fazer upload da imagem.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`border rounded-md p-4 ${className}`}>
      {preview ? (
        <div className="relative aspect-[16/5] w-full max-h-40 overflow-hidden rounded-lg shadow mb-4 bg-gray-100">
          <img 
            src={preview} 
            alt="Preview" 
            className="object-cover w-full h-full" 
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md mb-4 h-40">
          <Image className="w-10 h-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Nenhuma imagem selecionada</p>
        </div>
      )}
      <div className="flex items-center justify-center">
        <Button
          variant="outline"
          disabled={uploading}
          onClick={() => document.getElementById(`upload-${path}`)?.click()}
          className="w-full"
        >
          {uploading ? 'Enviando...' : preview ? 'Trocar Imagem' : 'Selecionar Imagem'}
        </Button>
        <input
          id={`upload-${path}`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
