import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import InputMask from 'react-input-mask';

interface ContatoInfo {
  id: string;
  endereco: string;
  email: string;
  telefone: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

const ContatoManager = () => {
  const [contato, setContato] = useState<ContatoInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContato();
  }, []);

  const fetchContato = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contato')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error;
      
      setContato(data || null);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar informações de contato',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ContatoInfo, value: string) => {
    if (contato) {
      setContato({ ...contato, [field]: value });
    }
  };

  const saveContato = async () => {
    if (!contato) return;
    
    // Validação básica
    if (!contato.endereco || !contato.email || !contato.telefone) {
      toast({
        title: 'Erro de validação',
        description: 'Endereço, email e telefone são campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }
    
    setSaving(true);
    try {
      let result;
      
      if (contato.id) {
        // Update existing
        result = await supabase
          .from('contato')
          .update({
            endereco: contato.endereco,
            email: contato.email,
            telefone: contato.telefone,
            facebook: contato.facebook,
            instagram: contato.instagram,
            youtube: contato.youtube
          })
          .eq('id', contato.id);
      } else {
        // Create new
        result = await supabase
          .from('contato')
          .insert({
            endereco: contato.endereco,
            email: contato.email,
            telefone: contato.telefone,
            facebook: contato.facebook,
            instagram: contato.instagram,
            youtube: contato.youtube
          })
          .select();
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: 'Informações salvas',
        description: 'As informações de contato foram salvas com sucesso!',
      });
      
      fetchContato();
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar informações',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const initializeNewContato = () => {
    setContato({
      id: '',
      endereco: '',
      email: '',
      telefone: '',
      facebook: '',
      instagram: '',
      youtube: ''
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Contato</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div>
          {!contato ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Nenhuma informação de contato encontrada.</p>
              <Button onClick={initializeNewContato}>
                Criar Informações de Contato
              </Button>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="endereco">Endereço Completo</Label>
                      <textarea
                        id="endereco"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                        value={contato.endereco}
                        onChange={(e) => handleChange('endereco', e.target.value)}
                        placeholder="Ex: Rua Exemplo, 123 - Bairro - Cidade - UF - CEP"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">E-mail Principal</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contato.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Ex: contato@exemplo.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="telefone">Telefone Principal</Label>
                      <InputMask
                        mask="(99) 99999-9999"
                        value={contato.telefone}
                        onChange={(e) => handleChange('telefone', e.target.value)}
                      >
                        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                          <Input
                            {...inputProps}
                            id="telefone"
                            placeholder="Ex: (00) 00000-0000"
                          />
                        )}
                      </InputMask>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={contato.facebook}
                        onChange={(e) => handleChange('facebook', e.target.value)}
                        placeholder="Ex: https://facebook.com/seulink"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={contato.instagram}
                        onChange={(e) => handleChange('instagram', e.target.value)}
                        placeholder="Ex: https://instagram.com/seulink"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="youtube">YouTube</Label>
                      <Input
                        id="youtube"
                        value={contato.youtube}
                        onChange={(e) => handleChange('youtube', e.target.value)}
                        placeholder="Ex: https://youtube.com/channel/seucanal"
                      />
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={saveContato} 
                  disabled={saving}
                  className="w-full mt-6"
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default ContatoManager;
