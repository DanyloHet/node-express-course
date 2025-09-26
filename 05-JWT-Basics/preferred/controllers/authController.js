const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

// Mockup Data
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

function login(req, res, next) {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    const error = new Error('Invalid credentials');
    error.status = StatusCodes.UNAUTHORIZED;
    return next(error);
  }

  // Generating token
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '24h' });

  res.json({ token });
}

module.exports = { login };


