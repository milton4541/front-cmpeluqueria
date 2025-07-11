import axios from "axios";

export const deleteRoleAPI = async (id: number): Promise<void> => {
    try {
        const token = localStorage.getItem('authToken');
        await axios.delete(
            `/api/v1/rol/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("Error deleting role:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to delete role");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}