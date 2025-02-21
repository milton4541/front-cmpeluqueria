import axios from "axios";
import { ApiResponse, apiResponseSchema } from "../utils/product-schema";


const API_URL_GET_PRODUCTS = "/api/v1/producto";

export const getProducts = async ():Promise<ApiResponse["data"]> => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(API_URL_GET_PRODUCTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const validatedData = apiResponseSchema.parse(response.data);
    return validatedData.data;
  } catch (error) {
    if(error instanceof Error){
      console.error("Error al obtener los productos:", error.message);
    }
      throw error;
  }
}