import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface OverviewMetricsProps {
  dateFrom: string;
  dateTo: string;
}

const MetricCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
  <div className="metric-card">
    {/* You can replace this with your icon logic */}
    <div className="metric-icon">{icon}</div>
    <div className="metric-title">{title}</div>
    <div className="metric-value">{value}</div>
  </div>
);

const OverviewMetrics = ({ dateFrom, dateTo }: OverviewMetricsProps) => {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOverviewMetrics() {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_analytics_overview', {
        date_from: dateFrom,
        date_to: dateTo
      });
      if (error) {
        console.error('Error fetching overview metrics:', error);
      } else {
        setMetrics(data);
      }
      setLoading(false);
    }
    fetchOverviewMetrics();
  }, [dateFrom, dateTo]);

  if (loading) return <div>Loading metrics...</div>;
  if (!metrics) return <div>No data available</div>;

  return (
    <div className="metrics-grid">
      <MetricCard 
        title="Completion Rate" 
        value={`${metrics.completion_rate}%`} 
        icon="checkCircle" 
      />
      <MetricCard 
        title="Engagement Rate" 
        value={`${metrics.engagement_rate}%`} 
        icon="eye" 
      />
      <MetricCard 
        title="Active Users" 
        value={metrics.active_users} 
        icon="users" 
      />
      <MetricCard 
        title="Lessons Sent" 
        value={metrics.total_lessons_sent} 
        icon="send" 
      />
    </div>
  );
};

export default OverviewMetrics;
