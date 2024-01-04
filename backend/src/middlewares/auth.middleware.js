const jwt = require('jsonwebtoken');
const { promisify } = require('util');

class AuthMiddleware {
  async authenticateToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }

    try {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }
}

module.exports = AuthMiddleware;