import express from 'express';
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;
import {
  getDashboardStats,
  getUsers,
  updateUser,
  deleteUser,
  getPayments,
  getProjects,
  updateProject,
  deleteProject,
  createProject,
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

// Protect all admin routes
router.use(requiresAuth());

// Dashboard stats
router.get('/stats', getDashboardStats);

// User management
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Payment management
router.get('/payments', getPayments);

// Project management
router.get('/projects', getProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Employee Management
router.post('/employees', createEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

// Client Management
router.get('/clients', getClients);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

// Settings
router.put('/settings', updateSettings);

export default router; 