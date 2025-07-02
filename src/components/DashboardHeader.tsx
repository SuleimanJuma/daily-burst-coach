import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, Plus, Settings, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

        <Button
          variant="outline"
          size="default"
          onClick={onSettings}
          className="relative"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifications > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-streak text-white text-xs">
              {unreadNotifications > 9 ? "9+" : unreadNotifications}
            </Badge>
          )}
        </Button>

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
      </div>
    </div>
  );
};