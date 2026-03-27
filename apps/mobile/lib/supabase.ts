// ── Supabase Client Configuration for React Native ──

import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key not set. Using mock data.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: (key) => {
        // React Native AsyncStorage or similar
        return null;
      },
      setItem: (key, value) => {
        // React Native AsyncStorage or similar
      },
      removeItem: (key) => {
        // React Native AsyncStorage or similar
      },
    },
  },
});
