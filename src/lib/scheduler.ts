import { supabase } from './supabaseClient';

export async function getUserPreferences(userId: string) {
    const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching user preferences:', error);
        return null;
    }

    return data;
}
