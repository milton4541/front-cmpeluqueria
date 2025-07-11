import { z } from "zod";

const userSchema = z.object({
    id: z.number(),
    role_name: z.string(),
    username: z.string(),
});

// const userWithOutIdSchema = z.object({
//     role_name: z.string(),
//     username: z.string(),
// });
export const newUserSchema = z.object({
    password: z.string(),
    role_id: z.number(),
    username: z.string(),
});

export const apiResponseSchema = z.object({
    data: z.array(userSchema),
    message: z.string(),
    status: z.string(),
});

export const apiNewUserSchema = z.object({
    data: z.string(),
    message: z.string(),
    status: z.string(),
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type userResponse = z.infer<typeof userSchema>;
export type newUserResponse = z.infer<typeof apiNewUserSchema>;