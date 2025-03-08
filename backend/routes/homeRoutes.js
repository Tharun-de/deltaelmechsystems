import express from 'express';
import { getHomeContent, updateHomeContent } from '../controllers/homeController.js';
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;

const router = express.Router();

router.get('/', getHomeContent);
router.put('/', requiresAuth(), updateHomeContent);

export default router;