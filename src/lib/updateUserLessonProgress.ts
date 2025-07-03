import { supabase } from './supabaseClient';

export async function updateUserLessonProgress(
  userId: string,
  lessonId: string,
  status: string,
  progressPercentage: number
) {
  const { data, error } = await supabase
    .from('user_lessons')
    .upsert([
      {
        user_id: userId,
        lesson_id: lessonId,
        status,
        progress_percentage: progressPercentage,
        started_at: status === 'in_progress' ? new Date() : null,
        completed_at: status === 'completed' ? new Date() : null,
      },
    ], { onConflict: 'user_id,lesson_id' });

  if (error) {
    console.error('Error updating user lesson progress:', error);
  } else {
    console.log('User lesson progress updated:', data);
  }
}
