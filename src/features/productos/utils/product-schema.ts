import { z } from "zod";

const productSchema = z.object({
    brand: z.string(),
    id: z.number(),
    name: z.string(),
    quantity: z.number(),
    unit: z.string(),
})

export const apiResponseSchema = z.object({
    data: z.array(productSchema),
    message: z.string(),
    status: z.string(),
});

export const apiNewProductSchema = z.object({
    message: z.string(),
    status: z.string(),
});



export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type product = z.infer<typeof productSchema>;
export type newProductResponse = z.infer<typeof apiNewProductSchema>;