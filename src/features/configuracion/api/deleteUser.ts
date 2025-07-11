import axios from "axios";

const API_DELETE_USER = '/api/v1/usuarios/';

export const deleteUserAPI = async (id: number): Promise<void> => {
    try {
        const token = localStorage.getItem('authToken');
        await axios.delete(
            API_DELETE_USER+`${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("Error deleting user:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to delete user");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}