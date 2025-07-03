import { supabase } from './supabaseClient';

export async function updateUserStreak(userId: string, increment = true) {
    const { data, error } = await supabase
        .from('user_streaks')
        .upsert([
            {
                user_id: userId,
                current_streak: increment ? 1 : 0,
                last_activity_date: new Date(),
            }
        ], { onConflict: 'user_id' });

    if (error) {
        console.error('Error updating user streak:', error);
    } else {
        console.log('User streak updated:', data);
    }
}

export async function updateDailyProgress(userId: string, date: string, completed: boolean) {
    const { data, error } = await supabase
        .from('daily_progress')
        .upsert([
            {
                user_id: userId,
                date,
                completed,
            }
        ], { onConflict: 'user_id,date' });

    if (error) {
        console.error('Error updating daily progress:', error);
    } else {
        console.log('Daily progress updated:', data);
    }
}
