import axios from "axios";

const API_DELETE_CLIENT= '/api/v1/cliente/';

export const deleteClientAPI = async (id: number): Promise<void> => {
    try {
        const token = localStorage.getItem('authToken');
        await axios.delete(
            API_DELETE_CLIENT+`${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("Error deleting client:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to delete client");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};