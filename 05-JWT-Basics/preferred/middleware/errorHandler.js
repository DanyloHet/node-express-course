const { StatusCodes } = require('http-status-codes');

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;

