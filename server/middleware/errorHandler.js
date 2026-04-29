/**
 * Global error handling middleware
 * Catches all errors and returns consistent error responses
 */
const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[ERROR] ${status} - ${message}`);

  res.status(status).json({
    success: false,
    error: {
      status,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

/**
 * 404 Not Found middleware
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      status: 404,
      message: `Route ${req.originalUrl} not found`,
    },
  });
};

module.exports = { errorHandler, notFoundHandler };
