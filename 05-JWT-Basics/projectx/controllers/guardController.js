const { StatusCodes } = require('http-status-codes');

function hello(req, res, next) {
  try {
    if (!req.user) {
      const error = new Error('User not authenticated');
      error.status = StatusCodes.FORBIDDEN; // 
      return next(error);
    }

    res.json({ message: `Hello, ${req.user.username}! You are authenticated.` });
  } catch (err) {
    next(err); // 
  }
}

module.exports = { hello };

