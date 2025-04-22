import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import type { Database } from '../interfaces/database.types';

export function useContato() {
  const [contato, setContato] = useState<Database['public']['Tables']['contato']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('contato')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data, error }) => {
        if (error) setError(error.message);
        if (data && data.length > 0) setContato(data[0]);
        setLoading(false);
      });
  }, []);

  return { contato, loading, error };
} 