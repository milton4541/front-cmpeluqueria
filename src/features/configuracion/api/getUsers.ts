import axios from "axios";
import { ApiResponse, apiResponseSchema } from "../utils/users-schema";

const API_URL_GET_USERS = "/api/v1/usuarios";

export const getUsers = async ():Promise<ApiResponse["data"]> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(API_URL_GET_USERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const validatedData = apiResponseSchema.parse(response.data);
    return validatedData.data;
  } catch (error) {
    if(error instanceof Error){
      console.error("Error al obtener los usuarios:", error.message);
    }
      throw error;
  }
}

