// src/services/newsService.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Fact = {
  id: string;
  date: string;
  content: string;
};

export async function fetchFacts(date: string, lang: 'en' | 'hi' = 'en'): Promise<Fact[]> {
  const { data, error } = await supabase
    .from('news_items')
    .select('id, date, content')
    .eq('date', date)
    .eq('lang', lang)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching facts:', error);
    return [];
  }

  return (data || []).map((item) => ({
    id: item.id,
    date: item.date,
    content: item.content ?? '',
  }));
}



