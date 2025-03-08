import React from 'react';
import { Users, Building, CreditCard, FileText } from 'lucide-react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatsCard from '../../components/dashboard/StatsCard';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import StatusPieChart from '../../components/dashboard/StatusPieChart';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import { formatCurrency } from '../../lib/utils';

const AdminDashboard = () => {
  const { stats, loading, error } = useAdminDashboard();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </DashboardLayout>
    );
  }

  const projectStatusData = [
    { name: 'Planning', value: stats?.projectsByStatus.planning || 0, color: '#3b82f6' },
    { name: 'In Progress', value: stats?.projectsByStatus.in_progress || 0, color: '#10b981' },
    { name: 'Completed', value: stats?.projectsByStatus.completed || 0, color: '#6366f1' },
    { name: 'On Hold', value: stats?.projectsByStatus.on_hold || 0, color: '#f59e0b' }
  ];

  const applicationStatusData = [
    { name: 'Pending', value: stats?.applicationsByStatus.pending || 0, color: '#f59e0b' },
    { name: 'Reviewed', value: stats?.applicationsByStatus.reviewed || 0, color: '#3b82f6' },
    { name: 'Shortlisted', value: stats?.applicationsByStatus.shortlisted || 0, color: '#10b981' },
    { name: 'Rejected', value: stats?.applicationsByStatus.rejected || 0, color: '#ef4444' }
  ];

  return (
    <DashboardLayout>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={<Users className="h-5 w-5" />}
          description="Active platform users"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Users"
          value={stats?.activeUsers || 0}
          icon={<Users className="h-5 w-5" />}
          description="Users active this month"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Monthly Revenue"
          value={formatCurrency(stats?.monthlyRevenue || 0)}
          icon={<CreditCard className="h-5 w-5" />}
          description="Revenue this month"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Total Applications"
          value={stats?.totalApplications || 0}
          icon={<FileText className="h-5 w-5" />}
          description="Job applications received"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AnalyticsChart
          data={stats?.revenueByMonth || []}
          title="Revenue Trend"
        />
        <StatusPieChart
          data={projectStatusData}
          title="Projects by Status"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusPieChart
          data={applicationStatusData}
          title="Applications by Status"
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;