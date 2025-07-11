import axios from "axios";
import { newRole } from "../types/role";

const API_ADD_ROLE = '/api/v1/rol';

export const addRoleAPI = async (newRole: newRole): Promise<void> => {
    try {
        const token = localStorage.getItem('authToken');
        await axios.post(
            API_ADD_ROLE,
            newRole,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("Error adding role:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to add role");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}