import axios from "axios";
import { RoleResponseSchema } from "../utils/role-schema";

const API_GET_ROL = '/api/v1/rol';

export const getRolAPI = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(API_GET_ROL,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = RoleResponseSchema.parse(response.data);
        return data;
    } catch (error) {
        console.error("Error getting role:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to get role");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

