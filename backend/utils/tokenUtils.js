const jwt = require('jsonwebtoken');

const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const checkIfTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return true; 

  const currentTime = Math.floor(Date.now() / 1000); 
  const expirationTime = decoded.exp;

  return expirationTime < currentTime;
};

module.exports = { checkIfTokenExpired };
