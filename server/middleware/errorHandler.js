const { sendError } = require('../utils/apiResponse');

/**
 * Global error handling middleware.
 * Must be registered last in the middleware chain.
 */
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.stack || err.message}`);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return sendError(res, messages.join(', '), 422);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return sendError(res, `Duplicate value for field: ${field}`, 409);
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return sendError(res, `Invalid ID format: ${err.value}`, 400);
  }

  // Default server error
  return sendError(res, err.message || 'Internal Server Error', err.statusCode || 500);
};

/**
 * Middleware to handle 404 routes.
 */
const notFound = (req, res, next) => {
  return sendError(res, `Route not found: ${req.originalUrl}`, 404);
};

module.exports = { errorHandler, notFound };
