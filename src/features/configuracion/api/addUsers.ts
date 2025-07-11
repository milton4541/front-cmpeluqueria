import axios from "axios";
import { newUser } from "../types/user";
import { newUserSchema } from "../utils/users-schema";

const API_ADD_USER = '/api/v1/usuarios';

export const addUsersAPI = async (newUser: newUser): Promise<void> => {
    try {
        const validateUser = newUserSchema.parse(newUser);
        const token = localStorage.getItem('authToken');
        await axios.post(
            API_ADD_USER,
            validateUser,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("Error adding user:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to add user");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}