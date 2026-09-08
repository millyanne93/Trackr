const { z } = require('zod');


const equipmentSchema = z.object({
    name: z.string()
        .min(2, 'Equipment name must be at least 2 characters')
        .max(100, 'Equipment name must be at most 100 characters'),
    description: z.string()
        .max(500, 'Description must be at most 500 characters')
        .optional()
        .nullable(),
    serialNumber: z.string()
        .max(50, 'Serial number must be at most 50 characters')
        .optional()
        .nullable(),
    status: z.enum(['available', 'issued', 'maintenance', 'retired'])
        .default('available')
        .optional(),
    imageUrl: z.string()
        .url('Invalid image URL')
        .optional()
        .nullable(),
});

const equipmentUpdateSchema = equipmentSchema.partial();

const assignmentSchema = z.object({
    equipmentId: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid equipment ID format'),
    userId: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID format'),
    returnDate: z.string()
        .refine(
            (val) => {
                
                if (!val) return true;
            
                if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return true;
                
                if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val)) return true;
                return false;
            },
            { message: 'Invalid date format. Use YYYY-MM-DD' }
        )
        .optional()
        .nullable(),
});

module.exports = {
    equipmentSchema,
    equipmentUpdateSchema,
    assignmentSchema,
};
