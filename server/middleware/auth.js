const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization'); // Get Authorization header
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(' ')[1]; // Split and get the second part
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded.user; // Attach user to request
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error('Token verification error:', err.message); // Log the error
    res.status(401).json({ msg: 'Token is not valid' }); // Handle invalid token
  }
};
