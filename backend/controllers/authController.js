import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ErrorResponse from '../utils/errorResponse.js';
import passwordSchema from '../utils/passwordValidator.js';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/tokenUtils.js';

// Set secure cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate password
  if (!passwordSchema.validate(password)) {
    throw new ErrorResponse(
      'Password must be at least 8 characters long and contain uppercase, lowercase, number and special character',
      400
    );
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ErrorResponse('User already exists', 400);
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user with the hashed password
  let user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'client'
  });

  console.log("User.create() result:", user);

  if (!user) {
    // Fallback: try to fetch the user by email if creation returns null
    user = await User.findOne({ email });
    if (!user) {
      throw new ErrorResponse('User creation failed', 500);
    }
  }

  // Generate tokens using user.id
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Instead of saving refreshToken to the database (since the column doesn't exist),
  // we only set it in the cookies.
  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.status(201).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Retrieve user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  // Compare provided password with the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorResponse('Invalid credentials', 401);
  }

  // Generate tokens using user.id
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Again, do not attempt to save the refreshToken to the DB.
  res.cookie('accessToken', accessToken, cookieOptions);
  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ErrorResponse('No refresh token', 401);
  }

  // Verify the refresh token
  const decoded = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!decoded) {
    throw new ErrorResponse('Invalid refresh token', 401);
  }

  // Retrieve user by ID
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  // NOTE: We are not checking user.refreshToken from DB here because it's not stored.

  const newAccessToken = generateAccessToken(user.id);
  res.cookie('accessToken', newAccessToken, cookieOptions);

  res.json({ success: true });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  // We do not clear a refreshToken in the DB because it isn't stored there.
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  
  res.json({ success: true });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }
  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});
