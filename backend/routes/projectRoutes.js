import express from 'express';
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

router.route('/')
  .get(requiresAuth(), getProjects)
  .post(requiresAuth(), createProject);

router.route('/:id')
  .get(requiresAuth(), getProjectById)
  .put(requiresAuth(), updateProject)
  .delete(requiresAuth(), deleteProject);

export default router;