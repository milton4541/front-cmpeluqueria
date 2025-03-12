import axios from "axios";
import { newService } from "../types/service";

const API_ADD_SERVICE = '/api/v1/servicio';

export const addServiceAPI = async (newService: newService): Promise<void> => {
    try {
        const token = localStorage.getItem('authToken');
        await axios.post(
            API_ADD_SERVICE,
            newService,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("Error adding service:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to add service");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}