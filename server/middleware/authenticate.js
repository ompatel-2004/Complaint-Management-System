const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config(); // Load environment variables from .env file


// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Attach user information to request object
    next();
  });
};

module.exports = { authenticateToken };
