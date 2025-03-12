import axios from "axios";

const API_DELETE_SERVICE = '/api/v1/servicio/';

export const deleteServiceAPI = async (id: number): Promise<void> => {
    try {
        const token = localStorage.getItem('authToken');
        await axios.delete(
            API_DELETE_SERVICE+`${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("Error deleting service:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to delete service");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}