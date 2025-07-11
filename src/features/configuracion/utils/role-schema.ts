import { z } from "zod";

// Esquema para un rol
const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  permissions: z.array(z.string()), // Permisos como un array de strings
});

// Esquema para la respuesta de la API
export const RoleResponseSchema = z.object({
  data: z.array(RoleSchema),
  message: z.string(),
  status: z.string(),
});