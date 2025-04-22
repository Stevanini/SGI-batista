import { useState } from 'react';
import { Copy } from 'lucide-react';
import QRCode from 'react-qr-code';

interface OffersModalPixProps {
  open: boolean;
  onClose: () => void;
  pixKey: string;
}

export function OffersModalPix({ open, onClose, pixKey }: OffersModalPixProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Contribua via PIX <span className="text-pink-500">💗</span>
        </h2>
        <p className="text-zinc-500 mb-4 text-center">Qualquer valor faz a diferença!</p>
        <div className="bg-white p-4 rounded-xl shadow mb-4">
          <QRCode value={pixKey} size={180} viewBox={`0 0 256 256`} className="w-full h-auto max-w-full" />
        </div>
        <div className="mb-4 text-center">
          <span className="font-semibold">Chave PIX: </span>
          <span className="font-mono">{pixKey}</span>
        </div>
        <div className="flex gap-2 w-full">
          <button
            onClick={handleCopy}
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Copy size={18} />
            {copied ? 'Copiado!' : 'Copiar Chave PIX'}
          </button>
          <button onClick={onClose} className="flex-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 font-bold py-2 rounded-lg transition">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
