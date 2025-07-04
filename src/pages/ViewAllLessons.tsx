import React from 'react';
import { LessonCard } from '@/components/LessonCard';

const ViewAllLessons: React.FC = () => {
  const allLessons = [
    {
      id: '1',
      title: "English Basics: Greetings & Introductions",
      description: "Practicing essential greeting phrases and how to introduce yourself professionally in a business setting.",
      duration: "5 min",
      studentsEnrolled: 324,
      completionRate: 89,
      status: "active" as const,
      lastSent: new Date(2024, 6, 1)
    },
    {
      id: '2', 
      title: "Digital Marketing: Social Media Basics",
      description: "Grasping the fundamentals of social media marketing and platform-specific best practices.",
      duration: "4 min",
      studentsEnrolled: 287,
      completionRate: 92,
      status: "active" as const,
      lastSent: new Date(2024, 6, 2)
    },
    {
      id: '3',
      title: "Entrepreneurship: Validating Business Ideas", 
      description: "Learning proven methods to test and validate your business ideas before investing time and money.",
      duration: "6 min",
      studentsEnrolled: 256,
      completionRate: 80,
      status: "draft" as const
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold text-foreground text-center mb-6">All Lessons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allLessons.map(lesson => (
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
  );
};

export default ViewAllLessons;

