const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

/**
 * Auth Middleware: Verify JWT token and attach user to request
 * Used for protected routes
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token provided, authorization denied',
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default-secret-key'
    );

    // Get user from database
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Attach user to request object
    req.user = user;
    req.user.id = decoded.id;

    logger.debug(`Auth middleware: User ${user.email} authenticated`);
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      logger.warn('Invalid token provided');
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
      });
    }

    if (error.name === 'TokenExpiredError') {
      logger.warn('Token expired');
      return res.status(401).json({
        success: false,
        error: 'Token expired',
      });
    }

    logger.error('Auth middleware error', error);
    res.status(500).json({
      success: false,
      error: 'Authentication failed',
    });
  }
};

module.exports = authMiddleware;
