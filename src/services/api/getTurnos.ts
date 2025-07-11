import axios from "axios";
import { turno } from "../types/turno";

export const getTurnos = async (): Promise<turno[]> => {
    try{
        const token = localStorage.getItem('authToken');
        const response = await axios.get(
            '/api/v1/turno',
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        console.log("Raw response from backend:", response.data);
        return response.data;
    }catch(error){
        console.error("Error getting turnos:", error);
        if (axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || "Failed to get turnos");
        }else{
            throw new Error("An unexpected error occurred");
        }
    }
}