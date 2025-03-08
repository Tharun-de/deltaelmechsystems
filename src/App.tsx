import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from './components/ui/toaster';
import { LoadingSpinner } from './components/ui/loading-spinner';
import ErrorBoundary from './components/ErrorBoundary';
import DashboardLayout from './components/layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProjects from './pages/admin/AdminProjects';
import AdminApplications from './pages/admin/AdminApplications';
import AdminContacts from './pages/admin/AdminContacts';
import AdminPayments from './pages/admin/AdminPayments';
import AdminSettings from './pages/admin/AdminSettings';
import ManagerDashboard from './pages/dashboard/ManagerDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CareersPage from './pages/CareersPage';
import JobDetailPage from './pages/JobDetailPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectDetailsPage from './pages/dashboard/ProjectDetailsPage';

// Leadership Pages
import CEOPage from './pages/leadership/CEOPage';
import TechnicalDirectorPage from './pages/leadership/TechnicalDirectorPage';
import OperationsHeadPage from './pages/leadership/OperationsHeadPage';
import LeadEngineerPage from './pages/leadership/LeadEngineerPage';

function App() {
  const { user, isLoading } = useAuth();

  const getDashboardRoute = () => {
    const role = user?.user_metadata?.role;
    return role ? `/${role}` : '/login';
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen size={48} />;
  }

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:id" element={<JobDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Leadership Routes */}
          <Route path="/leadership/ceo" element={<CEOPage />} />
          <Route path="/leadership/technical-director" element={<TechnicalDirectorPage />} />
          <Route path="/leadership/operations-head" element={<OperationsHeadPage />} />
          <Route path="/leadership/lead-engineer" element={<LeadEngineerPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ErrorBoundary>
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            </ErrorBoundary>
          } />
          <Route path="/admin/users" element={
            <ErrorBoundary>
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AdminUsers />
                </DashboardLayout>
              </ProtectedRoute>
            </ErrorBoundary>
          } />
          <Route path="/admin/projects" element={
            <ErrorBoundary>
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AdminProjects />
                </DashboardLayout>
              </ProtectedRoute>
            </ErrorBoundary>
          } />
          <Route path="/admin/applications" element={
            <ErrorBoundary>
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AdminApplications />
                </DashboardLayout>
              </ProtectedRoute>
            </ErrorBoundary>
          } />
          <Route path="/admin/contacts" element={
            <ErrorBoundary>
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AdminContacts />
                </DashboardLayout>
              </ProtectedRoute>
            </ErrorBoundary>
          } />
          <Route path="/admin/payments" element={
            <ErrorBoundary>
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AdminPayments />
                </DashboardLayout>
              </ProtectedRoute>
            </ErrorBoundary>
          } />
          <Route path="/admin/settings" element={
            <ErrorBoundary>
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout>
                  <AdminSettings />
                </DashboardLayout>
              </ProtectedRoute>
            </ErrorBoundary>
          } />

          <Route path="/manager/*" element={
            <ErrorBoundary>
              <ProtectedRoute requiredRole="manager">
                <ManagerDashboard />
              </ProtectedRoute>
            </ErrorBoundary>
          } />

          <Route path="/client/*" element={
            <ErrorBoundary>
              <ProtectedRoute requiredRole="client">
                <ClientDashboard />
              </ProtectedRoute>
            </ErrorBoundary>
          } />
          
          {/* Project Management Routes */}
          <Route path="/dashboard/projects/create" element={
            <ErrorBoundary>
              <ProtectedRoute>
                <CreateProjectPage />
              </ProtectedRoute>
            </ErrorBoundary>
          } />
          
          <Route path="/dashboard/projects/:id" element={
            <ErrorBoundary>
              <ProtectedRoute>
                <ProjectDetailsPage />
              </ProtectedRoute>
            </ErrorBoundary>
          } />
          
          {/* Redirect based on role */}
          <Route path="/dashboard" element={<Navigate to={getDashboardRoute()} replace />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;