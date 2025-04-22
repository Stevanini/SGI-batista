import { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getCroppedImg } from '@/lib/utils';

interface ImageCropUploadProps {
  bucketName: string;
  path: string;
  onSuccess: (data: { blob: Blob, url: string }) => void;
  currentImage?: string;
  className?: string;
  aspectRatio: number;
  cropWidth: number;
  cropHeight: number;
}

const ImageCropUpload = ({
  bucketName,
  path,
  onSuccess,
  currentImage,
  className,
  aspectRatio,
  cropWidth,
  cropHeight,
}: ImageCropUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setShowCrop(true);
  };

  const handleCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (!preview || !croppedAreaPixels) return;
    setUploading(true);
    try {
      const croppedBlob = await getCroppedImg(preview, croppedAreaPixels, cropWidth, cropHeight);
      const croppedUrl = URL.createObjectURL(croppedBlob);
      onSuccess({ blob: croppedBlob, url: croppedUrl });
      setShowCrop(false);
      setPreview(croppedUrl);
      toast({ title: 'Recorte salvo', description: 'A imagem foi recortada, mas ainda não enviada.' });
    } catch (error: any) {
      toast({ title: 'Erro no recorte', description: error.message || 'Ocorreu um erro ao recortar a imagem.', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleCancelCrop = () => {
    setShowCrop(false);
    setPreview(currentImage || null);
  };

  return (
    <div className={`border rounded-md p-4 ${className}`}>
      {showCrop && preview ? (
        <div className="mb-4">
          <div className="relative w-full bg-gray-100" style={{ aspectRatio }}>
            <Cropper
              image={preview}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" onClick={handleCancelCrop} disabled={uploading}>Cancelar</Button>
            <Button onClick={handleCropSave} disabled={uploading}>{uploading ? 'Enviando...' : 'Salvar Recorte'}</Button>
          </div>
        </div>
      ) : preview ? (
        <div className="mb-4">
          <div className="relative w-full bg-gray-100" style={{ aspectRatio }}>
            <img src={preview} alt="Preview" className="object-cover w-full h-full rounded-lg shadow" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md mb-4 h-40">
          <span className="w-10 h-10 text-gray-400">📷</span>
          <p className="mt-2 text-sm text-gray-500">Nenhuma imagem selecionada</p>
        </div>
      )}
      <div className="flex items-center justify-center">
        <Button
          variant="outline"
          disabled={uploading}
          onClick={() => document.getElementById(`upload-crop-${path}`)?.click()}
          className="w-full"
        >
          {uploading ? 'Enviando...' : preview ? 'Trocar Imagem' : 'Selecionar Imagem'}
        </Button>
        <input
          id={`upload-crop-${path}`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageCropUpload; 