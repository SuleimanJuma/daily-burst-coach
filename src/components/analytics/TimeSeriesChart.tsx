import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface TimeSeriesChartProps {
  dateFrom: string;
  dateTo: string;
  interval: 'day' | 'week' | 'month';
}

const TimeSeriesChart = ({ dateFrom, dateTo, interval }: TimeSeriesChartProps) => {
  const [timeData, setTimeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTimeSeriesData() {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_analytics_timeseries', {
        date_from: dateFrom,
        date_to: dateTo,
        interval_type: interval
      });
      if (error) {
        console.error('Error fetching time series data:', error);
      } else {
        setTimeData(data);
      }
      setLoading(false);
    }
    fetchTimeSeriesData();
  }, [dateFrom, dateTo, interval]);

  const exportCSV = async () => {
    const { data, error } = await supabase.rpc('export_analytics_csv', {
      date_from: dateFrom,
      date_to: dateTo,
      export_type: 'timeseries',
      interval_type: interval
    });
    if (error) {
      console.error('Error exporting CSV:', error);
    } else {
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `analytics_timeseries_${interval}_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  if (loading) return <div>Loading chart data...</div>;
  if (!timeData.length) return <div>No time series data available</div>;

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Daily Trends</h3>
        <button onClick={exportCSV}>Export CSV</button>
      </div>
      {/* Render your chart using your preferred charting library */}
      {/* Example: <LineChart data={timeData} /> */}
    </div>
  );
};

export default TimeSeriesChart;
