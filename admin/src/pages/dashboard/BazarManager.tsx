import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface BazarInfo {
  id: string;
  description: string;
  goal: number;
  current_value: number;
  disabled?: boolean;
}

const BazarManager = () => {
  const [bazarInfo, setBazarInfo] = useState<BazarInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [goalInput, setGoalInput] = useState('');
  const [currentValueInput, setCurrentValueInput] = useState('');

  useEffect(() => {
    fetchBazarInfo();
  }, []);

  useEffect(() => {
    if (bazarInfo) {
      setGoalInput(bazarInfo.goal?.toString() ?? '');
      setCurrentValueInput(bazarInfo.current_value?.toString() ?? '');
    }
  }, [bazarInfo]);

  const fetchBazarInfo = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bazar_info')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      setBazarInfo(data || null);
    } catch (error) {
      toast({
        title: 'Erro ao carregar informações do bazar',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof BazarInfo, value: string | number | boolean) => {
    if (bazarInfo) {
      if ((field === 'goal' || field === 'current_value') && (value === '' || isNaN(Number(value)))) {
        setBazarInfo({ ...bazarInfo, [field]: 0 });
      } else {
        setBazarInfo({ ...bazarInfo, [field]: value });
      }
    }
  };

  const saveBazarInfo = async () => {
    if (!bazarInfo) return;
    if (!bazarInfo.disabled && !bazarInfo.description.trim()) {
      setError('Descrição obrigatória');
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const goal = typeof bazarInfo.goal === 'number' && !isNaN(bazarInfo.goal) ? bazarInfo.goal : 0;
      const current_value = typeof bazarInfo.current_value === 'number' && !isNaN(bazarInfo.current_value) ? bazarInfo.current_value : 0;
      let result;
      if (bazarInfo.id) {
        result = await supabase
          .from('bazar_info')
          .update({
            description: bazarInfo.description,
            goal,
            current_value,
            disabled: !!bazarInfo.disabled,
          })
          .eq('id', bazarInfo.id);
      } else {
        result = await supabase
          .from('bazar_info')
          .insert({
            description: bazarInfo.description,
            goal,
            current_value,
            disabled: !!bazarInfo.disabled,
          })
          .select();
      }
      if (result.error) throw result.error;
      toast({
        title: 'Informações salvas',
        description: 'As alterações foram salvas com sucesso!',
      });
      fetchBazarInfo();
    } catch (error) {
      toast({
        title: 'Erro ao salvar informações',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const initializeNewBazar = () => {
    setBazarInfo({
      id: '',
      description: 'Descrição do bazar missionário',
      goal: 1000,
      current_value: 0,
      disabled: false,
    });
  };

  // Calculate progress percentage
  const goalNumber = bazarInfo && typeof bazarInfo.goal === 'number' && !isNaN(bazarInfo.goal) ? bazarInfo.goal : 0;
  const currentNumber = bazarInfo && typeof bazarInfo.current_value === 'number' && !isNaN(bazarInfo.current_value) ? bazarInfo.current_value : 0;
  const progressPercentage = goalNumber > 0 ? Math.min(Math.round((currentNumber / goalNumber) * 100), 100) : 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciamento do Bazar Missionário</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div>
          {!bazarInfo ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Nenhuma informação do bazar encontrada.</p>
              <Button onClick={initializeNewBazar}>
                Criar Informações do Bazar
              </Button>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Informações do Bazar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={!!bazarInfo.disabled}
                        onChange={e => handleChange('disabled', e.target.checked)}
                      />
                      Ocultar Objetivo
                    </label>
                  </div>
                  <div>
                    <Label htmlFor="description">Descrição do Objetivo</Label>
                    <textarea
                      id="description"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                      value={bazarInfo.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      disabled={!!bazarInfo.disabled}
                    />
                    {!bazarInfo.disabled && error && (
                      <span className="text-red-500 text-xs mt-1 block">{error}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="goal">Meta (R$)</Label>
                      <Input
                        id="goal"
                        type="number"
                        min="0"
                        step="0.01"
                        value={goalInput}
                        onChange={e => setGoalInput(e.target.value)}
                        onBlur={() => handleChange('goal', parseFloat(goalInput) || 0)}
                        disabled={!!bazarInfo.disabled}
                      />
                    </div>
                    <div>
                      <Label htmlFor="current_value">Valor Alcançado (R$)</Label>
                      <Input
                        id="current_value"
                        type="number"
                        min="0"
                        step="0.01"
                        value={currentValueInput}
                        onChange={e => setCurrentValueInput(e.target.value)}
                        onBlur={() => handleChange('current_value', parseFloat(currentValueInput) || 0)}
                        disabled={!!bazarInfo.disabled}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Progresso</Label>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-primary h-4 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm">
                      {progressPercentage}% (R$ {currentNumber.toFixed(2)} de R$ {goalNumber.toFixed(2)})
                    </div>
                  </div>
                  <Button 
                    onClick={saveBazarInfo} 
                    disabled={saving}
                    className="w-full mt-6"
                  >
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default BazarManager;
