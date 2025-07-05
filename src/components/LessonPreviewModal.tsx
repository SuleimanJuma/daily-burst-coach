import React from 'react';
import { trackEvent } from '@/lib/analytics';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Clock, Users, CheckCircle, MessageSquare, Play, X } from 'lucide-react';

interface LessonPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: {
    id: string;
    title: string;
    description: string;
    duration: string;
    studentsEnrolled: number;
    completionRate: number;
    status: 'draft' | 'active' | 'completed';
    content?: string;
    lastSent?: Date;
    nextScheduled?: Date;
  };
  onSendTestMessage?: () => void;
}

export const LessonPreviewModal: React.FC<LessonPreviewModalProps> = ({
  isOpen,
  onClose,
  lesson,
  onSendTestMessage
}) => {
  const statusConfig = {
    draft: { color: "bg-muted text-muted-foreground", label: "Draft" },
    active: { color: "bg-whatsapp text-white", label: "Active" },
    completed: { color: "bg-success text-white", label: "Completed" }
  };

  // Mock lesson content - in a real app, this would come from your API
  const lessonContent = lesson.content || `
🎯 **${lesson.title}**

Welcome to today's lesson! In the next ${lesson.duration}, we'll cover essential concepts that will help you grow your skills.

📚 **What you'll learn:**
• Key terminology and concepts
• Practical applications
• Real-world examples
• Quick exercises to practice

💡 **Let's start with the basics:**

The foundation of any good learning experience is understanding the core principles. Today we'll break down complex topics into digestible pieces that you can immediately apply.

🔍 **Example:**
Think about a time when you had to explain something complex to someone else. What made it easy or difficult to understand?

✅ **Quick Exercise:**
Take 30 seconds to write down one thing you want to improve about your current approach to this topic.

🎊 **Congratulations!**
You've completed today's lesson. Remember, consistency is key to mastering any skill.

**Tomorrow's preview:** We'll dive deeper into advanced techniques and explore practical applications.

Keep learning! 🚀
  `;


  const handleSendTest = () => {
    // Track WhatsApp test message event
    trackEvent('send_whatsapp_test_message', {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      userAction: 'test_message',
    });
    if (typeof onSendTestMessage === 'function') {
      onSendTestMessage();
    } else {
      alert('Test message sent! Check your WhatsApp.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <DialogTitle className="text-xl font-semibold">
                  {lesson.title}
                </DialogTitle>
                <Badge className={statusConfig[lesson.status].color}>
                  {statusConfig[lesson.status].label}
                </Badge>
              </div>
              <DialogDescription className="text-muted-foreground">
                {lesson.description}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lesson Stats */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                Duration
              </div>
              <p className="font-semibold text-foreground">{lesson.duration}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                <Users className="w-4 h-4" />
                Students
              </div>
              <p className="font-semibold text-foreground">{lesson.studentsEnrolled}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                <CheckCircle className="w-4 h-4" />
                Completion
              </div>
              <p className="font-semibold text-foreground">{lesson.completionRate}%</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                <MessageSquare className="w-4 h-4" />
                Platform
              </div>
              <p className="font-semibold text-whatsapp">WhatsApp</p>
            </div>
          </div>

          <Separator />

          {/* Lesson Content Preview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Lesson Content Preview</h3>
            </div>
            
            <div className="border rounded-lg p-4 bg-background">
              <div className="mb-4 text-sm text-muted-foreground">
                📱 <strong>WhatsApp Message Preview:</strong>
              </div>
              
              <ScrollArea className="h-[300px] w-full">
                <div className="whitespace-pre-wrap text-sm font-mono bg-whatsapp/5 p-4 rounded border-l-4 border-whatsapp">
                  {lessonContent}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Timing Information */}
          {(lesson.lastSent || lesson.nextScheduled) && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Scheduling Information</h4>
                {lesson.lastSent && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last sent:</span>
                    <span className="text-foreground font-medium">
                      {lesson.lastSent.toLocaleDateString()} at {lesson.lastSent.toLocaleTimeString()}
                    </span>
                  </div>
                )}
                {lesson.nextScheduled && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next scheduled:</span>
                    <span className="text-whatsapp font-medium">
                      {lesson.nextScheduled.toLocaleDateString()} at {lesson.nextScheduled.toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="whatsapp"
              onClick={handleSendTest}
              className="flex-1"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Test Message
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                console.log('Editing lesson:', lesson.id);
                onClose();
              }}
              className="flex-1"
            >
              Edit Lesson
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
