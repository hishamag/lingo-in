import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase is not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Form submissions are disabled.',
  );
}

// Never throw at import time: a missing config must not blank the whole site.
const notConfiguredError = { message: 'Supabase is not configured' };

const fallbackClient = {
  from: () => ({
    insert: async () => ({ data: null, error: notConfiguredError }),
    select: async () => ({ data: null, error: notConfiguredError }),
  }),
  functions: {
    invoke: async () => ({ data: null, error: notConfiguredError }),
  },
} as unknown as SupabaseClient;

export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : fallbackClient;
