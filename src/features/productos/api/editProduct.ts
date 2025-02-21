import axios from "axios";
import { editProduct } from "../types/product";

const API_EDIT_PRODUCT= '/api/v1/producto/';

export const editProductAPI = async (id: number, product: editProduct): Promise<void> => {
    try {
        console.log(product);
        const token = localStorage.getItem('authToken');
        await axios.put(
            API_EDIT_PRODUCT+`${id}`,
            product,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("Error editing product:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to edit product");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}