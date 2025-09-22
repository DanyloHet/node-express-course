const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not provided' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;


