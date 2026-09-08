const { authLimiter, equipmentLimiter, generalLimiter } = require('../config/rateLimiter');

const rateLimiters = {
    auth: authLimiter,
    equipment: equipmentLimiter, 
    general: generalLimiter, 
};

module.exports = rateLimiters;
