

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import OverviewMetrics from '../components/analytics/OverviewMetrics';
import TimeSeriesChart from '../components/analytics/TimeSeriesChart';
import LessonPerformance from '../components/analytics/LessonPerformance';



const AnalyticsDashboard: React.FC = () => {
  const [dateFrom, setDateFrom] = React.useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  });
  const [dateTo, setDateTo] = React.useState<string>(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [interval, setInterval] = React.useState<'day' | 'week' | 'month'>('day');
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="w-7 h-7 text-primary" /> Analytics Dashboard
        </h1>
        <Button variant="outline" onClick={() => navigate('/')}>Back to Dashboard</Button>
      </div>
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold mb-1">From</label>
          <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">To</label>
          <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Interval</label>
          <select value={interval} onChange={e => setInterval(e.target.value as 'day' | 'week' | 'month')} className="border rounded px-2 py-1">
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
      </div>
      <OverviewMetrics dateFrom={dateFrom} dateTo={dateTo} />
      <div className="my-8">
        <TimeSeriesChart dateFrom={dateFrom} dateTo={dateTo} interval={interval} />
      </div>
      <div className="my-8">
        <LessonPerformance dateFrom={dateFrom} dateTo={dateTo} />
      </div>
      {/* You can add UserSegments component here if you modularize it */}
    </div>
  );
};

export default AnalyticsDashboard;
