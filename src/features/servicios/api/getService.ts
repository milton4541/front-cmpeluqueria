import axios from "axios";
import { ApiResponse, apiResponseSchema } from "../utils/services-schema";

const API_URL_GET_SERVICES = "/api/v1/servicio";

export const getServices = async ():Promise<ApiResponse["data"]> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(API_URL_GET_SERVICES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    const validatedData = apiResponseSchema.parse(response.data);
    return validatedData.data;
  } catch (error) {
    if(error instanceof Error){
      console.error("Error al obtener los servicios:", error.message);
    }
      throw error;
  }
}