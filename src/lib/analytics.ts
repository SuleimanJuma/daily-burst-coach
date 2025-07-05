import { supabase } from './supabaseClient';
import { getCurrentUserId } from './utils';

export const trackEvent = async (eventType: string, data: any) => {
  const userId = await getCurrentUserId();
  await supabase.from('analytics_events').insert({
    event_type: eventType,
    metadata: data,
    user_id: userId,
    lesson_id: data.lessonId || null
  });
};
