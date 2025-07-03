import React from "react";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatCard } from "@/components/ui/stat-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { LessonCard } from "@/components/LessonCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MessageSquare,
  BookOpen,
  TrendingUp,
  Calendar,
  Zap,
  Clock,
  Target,
  Award,
  BarChart3,
} from "lucide-react";

const Index = () => {
  // Mock data for demonstration
  const stats = {
    totalStudents: 1247,
    activeStudents: 892,
    completionRate: 87,
    dailyEngagement: 76,
    totalLessons: 24,
    averageStreak: 12,
  };

  const recentLessons = [
    {
      id: "1",
      title: "English Basics: Greetings & Introductions",
      description: "Learn essential greeting phrases and how to introduce yourself professionally in business settings.",
      duration: "5 min",
      studentsEnrolled: 234,
      completionRate: 89,
      status: "active" as const,
      lastSent: new Date(2024, 6, 1),
      nextScheduled: new Date(2024, 6, 3),
    },
    {
      id: "2", 
      title: "Digital Marketing: Social Media Basics",
      description: "Understand the fundamentals of social media marketing and platform-specific best practices.",
      duration: "4 min",
      studentsEnrolled: 187,
      completionRate: 92,
      status: "active" as const,
      lastSent: new Date(2024, 6, 2),
      nextScheduled: new Date(2024, 6, 4),
    },
    {
      id: "3",
      title: "Entrepreneurship: Validating Business Ideas", 
      description: "Learn proven methods to test and validate your business ideas before investing time and money.",
      duration: "6 min",
      studentsEnrolled: 156,
      completionRate: 0,
      status: "draft" as const,
    },
  ];

  const weeklyEngagement = [
    { day: "Mon", lessons: 45, completions: 38 },
    { day: "Tue", lessons: 52, completions: 44 },
    { day: "Wed", lessons: 48, completions: 41 },
    { day: "Thu", lessons: 61, completions: 53 },
    { day: "Fri", lessons: 58, completions: 49 },
    { day: "Sat", lessons: 34, completions: 28 },
    { day: "Sun", lessons: 29, completions: 24 },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <DashboardHeader
          onCreateLesson={() => navigate('/create-lesson')}
          onViewMessages={() => navigate('/messages')}
          onSettings={() => navigate('/settings')}
          unreadNotifications={3}
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value={stats.totalStudents.toLocaleString()}
            subtitle={`${stats.activeStudents} active`}
            icon={<Users className="w-6 h-6 text-whatsapp" />}
            variant="whatsapp"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Completion Rate"
            value={`${stats.completionRate}%`}
            subtitle="Last 30 days"
            icon={<Target className="w-6 h-6 text-learning" />}
            variant="learning"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Daily Engagement"
            value={`${stats.dailyEngagement}%`}
            subtitle="Students opening lessons"
            icon={<Zap className="w-6 h-6 text-success" />}
            variant="success"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Average Streak"
            value={`${stats.averageStreak} days`}
            subtitle="Learning consistency"
            icon={<Award className="w-6 h-6 text-streak" />}
            variant="streak"
            trend={{ value: 2, isPositive: true }}
          />
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 lg:col-span-2 shadow-card bg-gradient-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Weekly Engagement</h3>
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4" />
                View Details
              </Button>
            </div>
            <div className="space-y-4">
              {weeklyEngagement.map((day, index) => (
                <div key={day.day} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-muted-foreground">
                    {day.day}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Lessons sent</span>
                      <span className="font-medium text-foreground">{day.lessons}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-whatsapp h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(day.lessons / 70) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completions</span>
                      <span className="font-medium text-success">{day.completions}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-success h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(day.completions / 70) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Today's Progress</h3>
            <div className="space-y-6">
              <div className="text-center">
                <ProgressRing
                  progress={stats.completionRate}
                  size="xl"
                  color="whatsapp"
                  className="mb-4"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {stats.completionRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </ProgressRing>
                <p className="text-sm text-muted-foreground">
                  Overall completion rate
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Messages sent</span>
                  <Badge variant="outline" className="bg-whatsapp-light text-whatsapp">
                    2,847 today
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active learners</span>
                  <Badge variant="outline" className="bg-learning-light text-learning">
                    {stats.activeStudents}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Lessons scheduled</span>
                  <Badge variant="outline" className="bg-success-light text-success">
                    {stats.totalLessons}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Lessons */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Recent Lessons</h2>
            <Button variant="outline">
              <BookOpen className="w-4 h-4" />
              View All Lessons
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                {...lesson}
                onPreview={() => console.log("Preview lesson", lesson.id)}
                onEdit={() => console.log("Edit lesson", lesson.id)}
                onSchedule={() => console.log("Schedule lesson", lesson.id)}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 p-6 shadow-card bg-gradient-card">
          <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="whatsapp" className="justify-start h-16">
              <MessageSquare className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Send Broadcast</div>
                <div className="text-xs opacity-90">Reach all students</div>
              </div>
            </Button>
            <Button variant="learning" className="justify-start h-16">
              <Calendar className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Schedule Lesson</div>
                <div className="text-xs opacity-90">Plan ahead</div>
              </div>
            </Button>
            <Button variant="success" className="justify-start h-16">
              <TrendingUp className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">View Analytics</div>
                <div className="text-xs opacity-90">Track performance</div>
              </div>
            </Button>
            <Button variant="streak" className="justify-start h-16">
              <Clock className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Set Reminders</div>
                <div className="text-xs opacity-90">Automate engagement</div>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
