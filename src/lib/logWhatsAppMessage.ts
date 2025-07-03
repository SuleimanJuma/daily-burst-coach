import { supabase } from './supabaseClient';

export async function logWhatsAppMessage({ userId, lessonId, messageContent, deliveryStatus = 'sent' }: {
    userId: string;
    lessonId: string;
    messageContent: string;
    deliveryStatus?: string;
}) {
    const { data, error } = await supabase
        .from('whatsapp_messages')
        .insert([{
            user_id: userId,
            lesson_id: lessonId,
            message_content: messageContent,
            delivery_status: deliveryStatus
        }]);

    if (error) {
        console.error('Error logging WhatsApp message:', error);
    } else {
        console.log('WhatsApp message logged successfully:', data);
    }
}
