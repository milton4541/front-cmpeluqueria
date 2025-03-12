import {z} from 'zod';

const serviceSchema = z.object({
    id: z.number(),
    description: z.string(),
    estimated_time_minutes: z.number(),
    name: z.string(),
    price: z.number(),
});

export const apiResponseSchema = z.object({
    data: z.array(serviceSchema),
    message: z.string(),
    status: z.string(),
});

export const apiNewServiceSchema = z.object({
    message: z.string(),
    status: z.string(),
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type service = z.infer<typeof serviceSchema>;
export type newServiceResponse = z.infer<typeof apiNewServiceSchema>;
