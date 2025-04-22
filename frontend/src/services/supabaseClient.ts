import { createClient } from '@supabase/supabase-js';
import type { Database } from '../interfaces/database.types';

const SUPABASE_URL = 'https://uwinkvtamgclhfiykcso.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3aW5rdnRhbWdjbGhmaXlrY3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNjAzNTMsImV4cCI6MjA2MDczNjM1M30.vvQjPNR3JvJLv715oPpkHaf50VvEKfRwj_OsZ7LIvCQ';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
