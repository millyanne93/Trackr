const { z } = require('zod');

const registerSchema = z.object({
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be at most 30 characters')
        .regex(/^[a-zA-Z0-9_\s]+$/, 'Username can only contain letters, numbers, underscores, and spaces'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters'),
    role: z.enum(['user', 'admin']).optional().default('user'),
});

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

const updateUserSchema = z.object({
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be at most 30 characters')
        .regex(/^[a-zA-Z0-9_\s]+$/, 'Username can only contain letters, numbers, underscores, and spaces')
        .optional(),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .optional(),
    role: z.enum(['user', 'admin']).optional(),
});

module.exports = {
    registerSchema,
    loginSchema,
    updateUserSchema,
};
