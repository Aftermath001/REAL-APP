const logger = require('../utils/logger');

/**
 * Role-based access control middleware
 * Restricts route access based on user role
 * @param {...string} allowedRoles - Roles allowed to access the route
 * @returns {function} Middleware function
 */
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Not authenticated',
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        logger.warn(
          `Unauthorized access attempt by user ${req.user.email} with role ${req.user.role}`
        );
        return res.status(403).json({
          success: false,
          error: 'Insufficient permissions',
          requiredRoles: allowedRoles,
          userRole: req.user.role,
        });
      }

      logger.debug(
        `Role check passed for user ${req.user.email} with role ${req.user.role}`
      );
      next();
    } catch (error) {
      logger.error('Role middleware error', error);
      res.status(500).json({
        success: false,
        error: 'Authorization check failed',
      });
    }
  };
};

module.exports = roleMiddleware;
