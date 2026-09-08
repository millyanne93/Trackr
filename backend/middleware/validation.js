const { ZodError } = require('zod');
const { registerSchema, loginSchema, updateUserSchema } = require('../schemas/user.schema');
const { equipmentSchema, equipmentUpdateSchema, assignmentSchema } = require('../schemas/equipment.schema');

// Generic validation middleware factory
const validate = (schema) => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    // ✅ FIXED: Safely handle undefined errors
                    errors: (error.errors || []).map(e => ({
                        field: e.path.join('.'),
                        message: e.message
                    }))
                });
            }
            next(error);
        }
    };
};

// Payload size validation
const validatePayloadSize = (req, res, next) => {
    const MAX_SIZE = 1024 * 10; // 10KB
    const contentLength = parseInt(req.headers['content-length']) || 0;
    
    if (contentLength > MAX_SIZE) {
        return res.status(413).json({
            success: false,
            message: 'Payload too large',
            maxSize: `${MAX_SIZE / 1024}KB`
        });
    }
    
    if (req.body && req.headers['content-type']?.includes('application/json')) {
        const bodySize = JSON.stringify(req.body).length;
        if (bodySize > MAX_SIZE) {
            return res.status(413).json({
                success: false,
                message: 'Payload too large',
                maxSize: `${MAX_SIZE / 1024}KB`
            });
        }
    }
    
    next();
};

// Honeypot middleware
const honeypotCheck = (req, res, next) => {
    if (req.body.honeypot && req.body.honeypot.length > 0) {
        console.log('🚫 Honeypot triggered — spam rejected');
        return res.status(200).json({
            success: true,
            message: 'Submission accepted',
            honeypot_triggered: true
        });
    }
    next();
};

// Pre-defined validators
const validators = {
    register: validate(registerSchema),
    login: validate(loginSchema),
    updateUser: validate(updateUserSchema),
    createEquipment: validate(equipmentSchema),
    updateEquipment: validate(equipmentUpdateSchema),
    assignEquipment: validate(assignmentSchema),
};

module.exports = {
    validate,
    validatePayloadSize,
    honeypotCheck,
    validators,
};
