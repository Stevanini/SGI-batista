import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface UserProfile {
  id: string;
  is_approved: boolean;
  email: string;
  is_admin?: boolean;
}

const UserApprovalManager = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers();
    fetchCurrentUserProfile();
    // eslint-disable-next-line
  }, [user]);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id, is_approved, email, is_admin');
    if (error) {
      toast({ title: 'Erro ao buscar usuários', description: error.message, variant: 'destructive' });
      setLoading(false);
      return;
    }
    // Filtra o próprio usuário
    const mapped = (data || []).filter((u: UserProfile) => u.id !== user?.id).map((u: UserProfile) => ({
      id: u.id,
      is_approved: u.is_approved,
      email: u.email || '(sem email)',
      is_admin: u.is_admin || false
    }));
    setUsers(mapped);
    setLoading(false);
  };

  const fetchCurrentUserProfile = async () => {
    if (user) {
      const { data } = await supabase
        .from('user_profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      setCurrentUserProfile(data as UserProfile);
    }
  };

  const handleToggleApproval = async (id: string, approve: boolean) => {
    setSaving(true);
    const { error } = await supabase
      .from('user_profiles')
      .update({ is_approved: approve })
      .eq('id', id);
    if (error) {
      toast({ title: 'Erro ao atualizar permissão', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Permissão atualizada', description: 'Status atualizado com sucesso!' });
      fetchUsers();
    }
    setSaving(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Aprovação de Usuários</h1>
      <Card>
        <CardHeader>
          <CardTitle>Usuários Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Aprovado?</th>
                    <th className="text-left p-2">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b">
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.is_approved ? 'Sim' : 'Não'}</td>
                      <td className="p-2">
                        {currentUserProfile?.is_admin && (
                          <Button
                            size="sm"
                            variant={user.is_approved ? 'outline' : 'default'}
                            disabled={saving}
                            onClick={() => handleToggleApproval(user.id, !user.is_approved)}
                          >
                            {user.is_approved ? 'Revogar' : 'Aprovar'}
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserApprovalManager; 