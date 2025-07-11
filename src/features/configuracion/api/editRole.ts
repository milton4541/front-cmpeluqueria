import axios from "axios";
import { editRole } from "../types/role";

const API_EDIT_ROLE = '/api/v1/rol';

export default async function editRoleAPI(role: editRole): Promise<void> {
    try {
        const token = localStorage.getItem('authToken');
        await axios.put(
            `${API_EDIT_ROLE}/${role.id}`,
            role,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("Error editing role:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to edit role");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}