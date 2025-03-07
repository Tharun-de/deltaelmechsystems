import { verifyToken } from '../utils/tokenUtils.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    // Get token from cookie
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify token
    const decoded = verifyToken(accessToken, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: 'Token expired or invalid' });
    }

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Not authorized' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};