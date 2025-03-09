import React, { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import {
  Users,
  Building2,
  DollarSign,
  FileText,
  UserPlus,
  CreditCard,
  FileSpreadsheet,
  AlertCircle,
  LayoutDashboard,
  Briefcase,
  Mail,
  Settings,
  Menu,
  ChevronRight,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardStats {
  total_projects: number;
  active_projects: number;
  total_employees: number;
  total_clients: number;
  total_revenue: number;
  pending_payments: number;
  total_payroll: number;
  pending_requests: number;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  salary: number;
  department: string;
  status: 'active' | 'inactive';
}

interface Project {
  id: string;
  title: string;
  status: string;
  client_name: string;
  project_manager: string;
  budget: number;
  start_date: string;
  end_date: string;
}

interface Payment {
  id: string;
  project_id: string;
  amount: number;
  status: string;
  due_date: string;
  client_name: string;
}

const AdminDashboard = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      
      if (!token) {
        setError('Authentication token not found');
        return;
      }

      const [statsRes, employeesRes, projectsRes, paymentsRes] = await Promise.all([
        fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/admin/employees', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/admin/projects', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/admin/payments', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // Check each response individually
      if (!statsRes.ok) throw new Error(`Stats API error: ${statsRes.statusText}`);
      if (!employeesRes.ok) throw new Error(`Employees API error: ${employeesRes.statusText}`);
      if (!projectsRes.ok) throw new Error(`Projects API error: ${projectsRes.statusText}`);
      if (!paymentsRes.ok) throw new Error(`Payments API error: ${paymentsRes.statusText}`);

      const [statsData, employeesData, projectsData, paymentsData] = await Promise.all([
        statsRes.json(),
        employeesRes.json(),
        projectsRes.json(),
        paymentsRes.json(),
      ]);

      setStats(statsData);
      setEmployees(employeesData);
      setProjects(projectsData);
      setPayments(paymentsData);
      setError(null); // Clear any previous errors
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard data';
      setError(errorMessage);
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, getAccessTokenSilently, navigate]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Access Denied</h2>
          <p className="mt-2">Please log in to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center text-red-600">
          <AlertCircle className="mx-auto h-8 w-8 mb-2" />
          <h2 className="text-xl font-semibold">Error</h2>
          <p className="mt-2">{error}</p>
          <button 
            onClick={() => fetchDashboardData()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-500 py-8">
        No dashboard data available
      </div>
    );
  }

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/admin',
      count: null
    },
    {
      title: 'Users',
      icon: <Users className="w-5 h-5" />,
      path: '/admin/users',
      count: 12
    },
    {
      title: 'Projects',
      icon: <Briefcase className="w-5 h-5" />,
      path: '/admin/projects',
      count: 8
    },
    {
      title: 'Applications',
      icon: <FileText className="w-5 h-5" />,
      path: '/admin/applications',
      count: 5
    },
    {
      title: 'Contacts',
      icon: <Mail className="w-5 h-5" />,
      path: '/admin/contacts',
      count: 3
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/admin/settings',
      count: null
    }
  ];

  // Mock data for dashboard cards
  const dashboardStats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      isPositive: true
    },
    {
      title: 'Active Projects',
      value: '45',
      change: '+5%',
      isPositive: true
    },
    {
      title: 'Job Applications',
      value: '89',
      change: '-3%',
      isPositive: false
    },
    {
      title: 'Contact Requests',
      value: '23',
      change: '+15%',
      isPositive: true
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'application',
      message: 'New job application received for Senior Electrical Engineer position',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'contact',
      message: 'New contact form submission from ABC Corporation',
      time: '15 minutes ago'
    },
    {
      id: 3,
      type: 'project',
      message: 'Project "Industrial Automation System" status updated to "In Progress"',
      time: '1 hour ago'
    },
    {
      id: 4,
      type: 'user',
      message: 'New client account created for XYZ Manufacturing',
      time: '2 hours ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-30
          ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className={`flex items-center ${!isSidebarOpen && 'justify-center'}`}>
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-8 h-8"
            />
            {isSidebarOpen && (
              <span className="ml-2 font-bold text-gray-800">Admin Panel</span>
            )}
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            ) : (
              <Menu className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors
                ${location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {item.icon}
              {isSidebarOpen && (
                <>
                  <span className="ml-3">{item.title}</span>
                  {item.count !== null && (
                    <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main 
        className={`transition-all duration-300 min-h-screen bg-gray-100
          ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/admin-avatar.jpg"
                  alt="Admin"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <div className="mt-2 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <span className={`ml-2 text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-gray-600">{activity.message}</p>
                    <span className="text-sm text-gray-400">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 