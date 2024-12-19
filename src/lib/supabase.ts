import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = 'https://wcdcfvwyfpgadcgsfabt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZGNmdnd5ZnBnYWRjZ3NmYWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NjM4NTQsImV4cCI6MjA1MDEzOTg1NH0.eIKeLpGrt2_2S9aawwdbrtu-vR3WSJ1ajues-bIYDWs';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);