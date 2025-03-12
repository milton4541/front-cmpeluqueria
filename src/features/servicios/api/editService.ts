import axios from "axios";
import { editService } from "../types/service";

const API_EDIT_SERVICE = '/api/v1/servicio/';

export const editServiceAPI = async (id: number, service: editService): Promise<void> => {
    try {
        const token = localStorage.getItem('authToken');
        console.log(service),
        await axios.put(
            API_EDIT_SERVICE + `${id}`,
            service,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    } catch (error) {
        console.error("Error editing service:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to edit service");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}