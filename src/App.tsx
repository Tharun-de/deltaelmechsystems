import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from './components/ui/toaster';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CareersPage from './pages/CareersPage';
import JobDetailPage from './pages/JobDetailPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectDetailsPage from './pages/dashboard/ProjectDetailsPage';

// Leadership Pages
import CEOPage from './pages/leadership/CEOPage';
import TechnicalDirectorPage from './pages/leadership/TechnicalDirectorPage';
import OperationsHeadPage from './pages/leadership/OperationsHeadPage';
import LeadEngineerPage from './pages/leadership/LeadEngineerPage';

// Dashboard Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import DeveloperDashboard from './pages/dashboard/DeveloperDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';

// Protected Routes
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes>
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
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/developer" element={
            <ProtectedRoute requiredRole="developer">
              <DeveloperDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard/client" element={
            <ProtectedRoute requiredRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          } />
          
          {/* Project Management Routes */}
          <Route path="/dashboard/projects/create" element={
            <ProtectedRoute>
              <CreateProjectPage />
            </ProtectedRoute>
          } />
          <Route
            path="/dashboard/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetailsPage />
              </ProtectedRoute>
            }
          />
          
          {/* Catch-all route for the old dashboard path */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          } />
          
          {/* Admin Dashboard Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  );
}

export default App;