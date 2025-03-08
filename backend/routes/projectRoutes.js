import express from 'express';
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

// Protect all project routes
router.use(requiresAuth());

router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

export default router;

