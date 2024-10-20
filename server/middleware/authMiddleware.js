const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token

  if (!token) {
    return res.sendStatus(401); // If no token, return Unauthorized
  }

  // Verify the token using the secret
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.sendStatus(403); // If token is invalid, return Forbidden
    }

    // Attach the userId from the token to the request object
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
