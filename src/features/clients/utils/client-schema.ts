import { z } from "zod";

// Definimos el esquema para un appointment
const appointmentSchema = z.object({
    appointment_date: z.string(), // Formato de fecha/hora como string
    id: z.number(),
    status: z.string(),
  });
  
  // Definimos el esquema para un cliente
  const clientSchema = z.object({
    appointments: z.nullable(z.array(appointmentSchema)), // Lista de citas asociadas
    email: z.string(), // Validamos que sea un email válido
    id: z.number(),
    last_name: z.string(),
    name: z.string(),
    phone: z.string(), // Asumimos que el teléfono es un string
  });
  
  // Definimos el esquema para la respuesta completa
  export const apiResponseSchema = z.object({
    data: z.array(clientSchema), // Lista de clientes
    message: z.string(),
    status: z.string(),
  });

  export type ApiResponse = z.infer<typeof apiResponseSchema>;
  export type Client = z.infer<typeof clientSchema>;
  export type Appointment = z.infer<typeof appointmentSchema>;
