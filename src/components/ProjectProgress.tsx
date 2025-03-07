import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BarChart, LineChart, PieChart, Pie, XAxis, YAxis, Tooltip, Line, Bar } from 'recharts';
import { Clock, CheckCircle2, AlertCircle, TrendingUp, Users } from 'lucide-react';

interface ProgressMetrics {
  total_tasks: number;
  completed_tasks: number;
  in_progress_tasks: number;
  delayed_tasks: number;
  overall_progress: number;
  time_elapsed: number;
  time_remaining: number;
  team_performance: number;
}

interface TaskDistribution {
  name: string;
  value: number;
}

interface ProgressHistory {
  date: string;
  progress: number;
  tasks_completed: number;
}

interface ProjectProgressProps {
  projectId: string;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({ projectId }) => {
  const { user } = useAuth0();
  const [metrics, setMetrics] = useState<ProgressMetrics | null>(null);
  const [taskDistribution, setTaskDistribution] = useState<TaskDistribution[]>([]);
  const [progressHistory, setProgressHistory] = useState<ProgressHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProgressData();
  }, [projectId]);

  const fetchProgressData = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/progress`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch progress data');
      const data = await response.json();
      setMetrics(data.metrics);
      setTaskDistribution(data.task_distribution);
      setProgressHistory(data.progress_history);
    } catch (err) {
      setError('Failed to load progress data');
      console.error('Error fetching progress data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center text-gray-500 py-8">
        No progress data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-500">Overall Progress</h3>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-semibold text-gray-900">
              {metrics.overall_progress}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${metrics.overall_progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-500">Time Elapsed</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {metrics.time_elapsed}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-500">Tasks Completed</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {metrics.completed_tasks}/{metrics.total_tasks}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-500">Team Performance</h3>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {metrics.team_performance}%
          </p>
        </div>
      </div>

      {/* Task Distribution Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Task Distribution</h3>
        <div className="h-64">
          <PieChart width={400} height={250} data={taskDistribution}>
            <Pie
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
          </PieChart>
        </div>
      </div>

      {/* Progress History Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Progress History</h3>
        <div className="h-64">
          <LineChart width={600} height={250} data={progressHistory}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="progress" stroke="#8884d8" />
            <Line type="monotone" dataKey="tasks_completed" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>

      {/* Task Status Breakdown */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Task Status Breakdown</h3>
        <div className="h-64">
          <BarChart width={600} height={250} data={[
            { name: 'Completed', value: metrics.completed_tasks },
            { name: 'In Progress', value: metrics.in_progress_tasks },
            { name: 'Delayed', value: metrics.delayed_tasks },
          ]}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
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

export default ProjectProgress; 