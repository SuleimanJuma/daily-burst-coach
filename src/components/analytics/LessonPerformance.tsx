import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface LessonPerformanceProps {
  dateFrom: string;
  dateTo: string;
}

const LessonPerformance = ({ dateFrom, dateTo }: LessonPerformanceProps) => {
  const [lessonData, setLessonData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLessonPerformance() {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_lesson_performance', {
        date_from: dateFrom,
        date_to: dateTo,
        limit_count: 20
      });
      if (error) {
        console.error('Error fetching lesson performance:', error);
      } else {
        setLessonData(data);
      }
      setLoading(false);
    }
    fetchLessonPerformance();
  }, [dateFrom, dateTo]);

  const exportCSV = async () => {
    const { data, error } = await supabase.rpc('export_analytics_csv', {
      date_from: dateFrom,
      date_to: dateTo,
      export_type: 'lesson_performance'
    });
    if (error) {
      console.error('Error exporting CSV:', error);
    } else {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `lesson_performance_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  if (loading) return <div>Loading lesson data...</div>;
  if (!lessonData.length) return <div>No lesson performance data available</div>;

  return (
    <div className="lesson-performance">
      <div className="table-header">
        <h3>Lesson Performance</h3>
        <button onClick={exportCSV}>Export CSV</button>
      </div>
      {/* Render your table here */}
      {/* Example: <LessonTable data={lessonData} /> */}
    </div>
  );
};

export default LessonPerformance;
