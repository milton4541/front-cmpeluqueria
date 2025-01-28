
import {z} from "zod"

const apiNewClientSchema = z.object({
    name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
});

export const apiNewClientResponse = z.object({
        data: z.array(apiNewClientSchema), // Lista de clientes
        message: z.string(),
        status: z.string(),
})


export type newClient = z.infer<typeof apiNewClientSchema>;