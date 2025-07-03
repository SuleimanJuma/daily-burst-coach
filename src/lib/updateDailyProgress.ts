import { supabase } from './supabaseClient';

export async function updateDailyProgress(userId: string, lessonsCompleted = 1, timeSpent = 5) {
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    const { data, error } = await supabase
        .from('daily_progress')
        .upsert([
            {
                user_id: userId,
                date: today,
                lessons_completed: lessonsCompleted,
                time_spent: timeSpent,
                streak_count: 1
            }
        ], { onConflict: 'user_id,date' });

    if (error) {
        console.error('Error updating daily progress:', error);
    } else {
        console.log('Daily progress updated:', data);
    }
}
