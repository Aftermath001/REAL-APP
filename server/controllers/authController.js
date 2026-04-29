const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');
const { validateRegisterData, validateLoginData } = require('../utils/validation');

/**
 * Generate JWT Token
 * @param {string} userId - User ID
 * @returns {string} JWT Token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'default-secret-key',
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};

/**
 * POST /api/auth/register
 * Register a new user
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    const validation = validateRegisterData({ name, email, password });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors,
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered',
      });
    }

    // Create new user
    user = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      role: 'investor', // Default role
    });

    // Save user (password will be hashed by pre-save middleware)
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    // Log successful registration
    logger.info(`User registered: ${user.email}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    logger.error('Registration error', error);

    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered',
      });
    }

    next(error);
  }
};

/**
 * POST /api/auth/login
 * Login user with credentials
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const validation = validateLoginData({ email, password });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validation.errors,
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+password'
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    // Check password
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      logger.warn(`Failed login attempt for: ${email}`);
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Log successful login
    logger.info(`User logged in: ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    logger.error('Login error', error);
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Get current logged-in user (protected route)
 */
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user: user.toJSON(),
    });
  } catch (error) {
    logger.error('Get user error', error);
    next(error);
  }
};

/**
 * POST /api/auth/logout
 * Logout user (client-side JWT removal)
 */
exports.logout = async (req, res, next) => {
  try {
    logger.info(`User logged out: ${req.user.email}`);

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    logger.error('Logout error', error);
    next(error);
  }
};
