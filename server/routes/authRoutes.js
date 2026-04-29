const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

/**
 * Public Routes
 */

/**
 * POST /api/auth/register
 * Register a new user
 * Body: { name, email, password }
 */
router.post('/register', register);

/**
 * POST /api/auth/login
 * Login user
 * Body: { email, password }
 */
router.post('/login', login);

/**
 * Protected Routes
 */

/**
 * GET /api/auth/me
 * Get current user profile (requires authentication)
 */
router.get('/me', authMiddleware, getMe);

/**
 * POST /api/auth/logout
 * Logout user (requires authentication)
 */
router.post('/logout', authMiddleware, logout);

/**
 * Admin-only route example
 * GET /api/auth/admin-test
 * This demonstrates role-based access control
 */
router.get('/admin-test', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin access granted',
    user: req.user,
  });
});

module.exports = router;
