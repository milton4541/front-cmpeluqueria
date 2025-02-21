import axios from "axios";

const API_DELETE_PRODUCT= '/api/v1/producto/';

export const deleteProductAPI = async (id: number): Promise<void> => {
    try {
        const token = localStorage.getItem('authToken');
        await axios.delete(
            API_DELETE_PRODUCT+`${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("Error deleting product:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to delete product");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}