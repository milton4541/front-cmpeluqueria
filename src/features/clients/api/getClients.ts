import axios from 'axios';
import { ApiResponse, apiResponseSchema } from '../utils/client-schema';
import { z } from 'zod';

const API_URL = '/api/v1/cliente';

export const getClients = async (): Promise<ApiResponse["data"]> => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }); 
      const validatedData = apiResponseSchema.parse(response.data); 
      return validatedData.data; 
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al obtener los clientes:", error.message);
      }
      if (error instanceof z.ZodError) {
        console.error("Error de validación Zod:", error.errors);
      }
      throw error;
    }
  };