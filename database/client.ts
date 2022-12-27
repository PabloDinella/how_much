import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const client = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY || ''
);

export default client;
