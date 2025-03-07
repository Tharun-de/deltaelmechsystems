import express from 'express';
import { requiresAuth } from 'express-openid-connect';
import {
  getDashboardStats,
  getEmployees,
  getProjects,
  getPayments,
  createProject,
  updateProject,
  deleteProject,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  createPayment,
  updatePayment,
  deletePayment,
  getClients,
  createClient,
  updateClient,
  deleteClient,
  updateSettings
} from '../controllers/adminController.js';

const router = express.Router();

// Apply Auth0 authentication to all admin routes
router.use(requiresAuth());

// Dashboard Stats
router.get('/stats', getDashboardStats);

// Employee Management
router.get('/employees', getEmployees);
router.post('/employees', createEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

// Project Management
router.get('/projects', getProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Payment Management
router.get('/payments', getPayments);
router.post('/payments', createPayment);
router.put('/payments/:id', updatePayment);
router.delete('/payments/:id', deletePayment);

// Client Management
router.get('/clients', getClients);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

// Settings
router.put('/settings', updateSettings);

export default router; 