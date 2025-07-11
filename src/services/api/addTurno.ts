import axios from "axios";
import { newTurno } from "../types/turno";

const TURNO_API_URL = '/api/v1/turno';

export const addTurnoAPI = async (newTurnoData: newTurno): Promise<void> => {
    try{
        console.log("Adding turno:", newTurnoData);
        const token = localStorage.getItem('authToken');
        await axios.post(
            TURNO_API_URL,
            newTurnoData,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
    }catch(error){
        console.error("Error adding turno:", error);
        if (axios.isAxiosError(error)){
            throw new Error(error.response?.data?.message || "Failed to add turno");
        }else{
            throw new Error("An unexpected error occurred");
        }
    }
}