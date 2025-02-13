
import {z} from "zod"

const apiNewClientSchema = z.object({
    email: z.string().email(),
    last_name: z.string(),
    name: z.string(),
    phone: z.string(),
});

export const apiNewClientResponse = z.object({
    status: z.string(),
    message: z.string(),
})


export type newClient = z.infer<typeof apiNewClientSchema>;
export type apiNewClientResponse = z.infer<typeof apiNewClientResponse>