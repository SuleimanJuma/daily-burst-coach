import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, CheckCircle, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  studentsEnrolled: number;
  completionRate: number;
  status: "draft" | "active" | "completed";
  lastSent?: Date;
  nextScheduled?: Date;
  onPreview?: () => void;
  onEdit?: () => void;
  onSchedule?: () => void;
}

const statusConfig = {
  draft: {
    color: "bg-muted text-muted-foreground",
    label: "Draft"
  },
  active: {
    color: "bg-whatsapp text-white",
    label: "Active"
  },
  completed: {
    color: "bg-success text-white",
    label: "Completed"
  }
};

export const LessonCard: React.FC<LessonCardProps> = ({
  title,
  description,
  duration,
  studentsEnrolled,
  completionRate,
  status,
  lastSent,
  nextScheduled,
  onPreview,
  onEdit,
  onSchedule,
}) => {
  return (
    <Card className="p-6 shadow-card hover:shadow-hover transition-all duration-300 bg-gradient-card">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                {title}
              </h3>
              <Badge className={cn("text-xs", statusConfig[status].color)}>
                {statusConfig[status].label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-3 border-y border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
              <Clock className="w-4 h-4" />
              Duration
            </div>
            <p className="font-semibold text-foreground">{duration}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              Students
            </div>
            <p className="font-semibold text-foreground">{studentsEnrolled}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
              <CheckCircle className="w-4 h-4" />
              Completion
            </div>
            <p className="font-semibold text-foreground">{completionRate}%</p>
          </div>
        </div>

        {/* Timing info */}
        <div className="space-y-2 text-sm">
          {lastSent && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last sent:</span>
              <span className="text-foreground font-medium">
                {lastSent.toLocaleDateString()}
              </span>
            </div>
          )}
          {nextScheduled && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next scheduled:</span>
              <span className="text-whatsapp font-medium">
                {nextScheduled.toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreview}
            className="flex-1"
          >
            <Play className="w-4 h-4" />
            Preview
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onEdit}
            className="flex-1"
          >
            Edit
          </Button>
          {status === "draft" && (
            <Button
              variant="whatsapp"
              size="sm"
              onClick={onSchedule}
              className="flex-1"
            >
              Schedule
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};