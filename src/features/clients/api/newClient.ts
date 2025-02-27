import axios from "axios";
import { apiNewClientResponse } from "../utils/newClient-schema";
import { Client } from "../types/client";

const API_URL_NEW_CLIENT = '/api/v1/cliente';



export const newClientRead = async (clientData: Client): Promise<apiNewClientResponse> => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post(
            API_URL_NEW_CLIENT,
            clientData, // <-- Envía los datos al cuerpo de la solicitud
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        console.log("Respuesta de la API:", response.data); // <-- Verifica la respuesta

        // Valida la respuesta de la API
        const validatedData = apiNewClientResponse.parse(response.data);
        return validatedData;
    } catch (error) {
        console.error("Error creating new client:", error);

        // Lanza un error con un mensaje más descriptivo
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "Failed to create new client");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};