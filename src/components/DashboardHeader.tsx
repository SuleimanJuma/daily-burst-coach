import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings, MessageSquare, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationBell } from "@/components/NotificationBell";

interface DashboardHeaderProps {
  onCreateLesson?: () => void;
  onViewMessages?: () => void;
  onSettings?: () => void;
  unreadNotifications?: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onCreateLesson,
  onViewMessages,
  onSettings,
  unreadNotifications = 0,
}) => {
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Daily Burst Coach
        </h1>
        <p className="text-lg text-muted-foreground">
          Empowering minds, one micro-lesson at a time
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="default"
          onClick={onViewMessages}
          className="relative"
        >
          <MessageSquare className="w-4 h-4" />
          WhatsApp Hub
        </Button>

        <NotificationBell />

        <Button
          variant="outline"
          size="default"
          onClick={onSettings}
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>

        <Button
          variant="gradient"
          size="default"
          onClick={onCreateLesson}
          className="shadow-hover"
        >
          <Plus className="w-4 h-4" />
          Create Lesson
        </Button>

        <Button
          variant="outline"
          size="default"
          onClick={handleLogout}
          className="text-destructive hover:text-destructive"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};