// utils/errorHandler.js
class ApiError extends Error {
  constructor(statusCode, message, errorCode, path) {
    super(message);
    this.statusCode = statusCode; // HTTP status code
    this.errorCode = errorCode; // Custom application error code
    this.timestamp = new Date().toISOString(); // Timestamp for debugging
    this.path = path; // API endpoint that caused the error
    this.requestId = uuidv4(); 
  }
}

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const response = {
    requestId: err.requestId || uuidv4(),
    errorCode: err.errorCode || "UNKNOWN_ERROR", // Default if not set
    timestamp: err.timestamp || new Date().toISOString(),
    statusCode: statusCode,
    message: err.message || "Internal Server Error",
    path: err.path || req.originalUrl,
  };

  // Log the error for debugging
  console.error(`[${response.timestamp}] Error: ${response.message} (Request ID: ${response.requestId})`);

  res.status(statusCode).json(response);
};

module.exports = { ApiError, errorHandler };
  