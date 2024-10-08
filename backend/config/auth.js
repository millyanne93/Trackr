const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { checkIfTokenExpired } = require('../utils/tokenUtils');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Authorization header missing or malformed');
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (checkIfTokenExpired(token)) {
      console.error('Token expired');
      return res.status(401).json({ message: 'Token expired' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    // Use `decoded.id` instead of `decoded._id` since the token payload contains `id`
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

    if (!user) {
      console.error(`User not found with ID: ${decoded.id}`);
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message || 'Please authenticate');
    res.status(401).json({ message: 'Please authenticate' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    console.error('Forbidden access attempt by non-admin');
    res.status(403).json({ message: 'Forbidden: Admins only' });
  }
};

module.exports = { authMiddleware, isAdmin };
