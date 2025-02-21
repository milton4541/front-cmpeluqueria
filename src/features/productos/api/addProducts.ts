import axios from "axios";
import { newProduct } from "../types/product";
import { apiNewProductSchema, newProductResponse } from "../utils/product-schema";

const API_URL_ADD_PRODUCT = "/api/v1/producto";

export const addProductApi = async (newProduct: newProduct): Promise<newProductResponse> => {
    try{
        const token = localStorage.getItem("authToken");
        const response = await axios.post(API_URL_ADD_PRODUCT, newProduct, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const validatedData = apiNewProductSchema.parse(response.data);
        return validatedData;
    }catch(error){
        console.error("Error adding new product:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to add new product");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};