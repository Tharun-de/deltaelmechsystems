import express from 'express';
import { getHomePage, updateHomePage } from '../controllers/homeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getHomePage);
router.put('/', protect, admin, updateHomePage);

export default router;