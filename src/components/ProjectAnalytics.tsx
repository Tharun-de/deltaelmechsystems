import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  AlertCircle,
  Download,
} from 'lucide-react';

interface AnalyticsData {
  project_metrics: {
    total_budget: number;
    spent_budget: number;
    total_tasks: number;
    completed_tasks: number;
    team_size: number;
    project_duration: number;
    time_elapsed: number;
  };
  cost_breakdown: {
    category: string;
    amount: number;
  }[];
  task_completion: {
    date: string;
    completed: number;
    total: number;
  }[];
  team_performance: {
    member: string;
    tasks_completed: number;
    tasks_delayed: number;
    efficiency: number;
  }[];
  risk_metrics: {
    category: string;
    count: number;
    severity: 'low' | 'medium' | 'high';
  }[];
}

interface ProjectAnalyticsProps {
  projectId: string;
}

const ProjectAnalytics: React.FC<ProjectAnalyticsProps> = ({ projectId }) => {
  const { user } = useAuth0();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    fetchAnalyticsData();
  }, [projectId, dateRange]);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch(
        `/api/projects/${projectId}/analytics?range=${dateRange}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (!response.ok) throw new Error('Failed to fetch analytics data');
      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error('Error fetching analytics data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportReport = async () => {
    try {
      const response = await fetch(
        `/api/projects/${projectId}/analytics/export`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (!response.ok) throw new Error('Failed to export report');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `project-analytics-${projectId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to export report');
      console.error('Error exporting report:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-gray-500 py-8">
        No analytics data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Project Analytics</h2>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as 'week' | 'month' | 'year')}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          <button
            onClick={handleExportReport}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-500">Budget Utilization</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {((data.project_metrics.spent_budget / data.project_metrics.total_budget) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500">
            ${data.project_metrics.spent_budget.toLocaleString()} / ${data.project_metrics.total_budget.toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-500">Task Completion</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {((data.project_metrics.completed_tasks / data.project_metrics.total_tasks) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500">
            {data.project_metrics.completed_tasks} / {data.project_metrics.total_tasks} tasks
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-500">Time Progress</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {((data.project_metrics.time_elapsed / data.project_metrics.project_duration) * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500">
            {data.project_metrics.time_elapsed} / {data.project_metrics.project_duration} days
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-500">Team Size</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {data.project_metrics.team_size}
          </p>
          <p className="text-sm text-gray-500">Active members</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Breakdown */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.cost_breakdown}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Completion Trend */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Task Completion Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.task_completion}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#8884d8"
                  name="Completed"
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#82ca9d"
                  name="Total"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Team Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.team_performance}>
                <XAxis dataKey="member" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="tasks_completed"
                  fill="#8884d8"
                  name="Completed Tasks"
                />
                <Bar
                  dataKey="tasks_delayed"
                  fill="#ff7300"
                  name="Delayed Tasks"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Assessment</h3>
          <div className="space-y-4">
            {data.risk_metrics.map((risk, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{risk.category}</p>
                  <p className="text-sm text-gray-500">{risk.count} issues</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    risk.severity === 'high'
                      ? 'bg-red-100 text-red-800'
                      : risk.severity === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {risk.severity.charAt(0).toUpperCase() + risk.severity.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAnalytics; 