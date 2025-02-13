import axios from "axios";
import { apiNewClientResponse } from "../utils/newClient-schema";
import { ClientWithId } from "../types/client";

const API_URL_EDIT_CLIENT = '/api/v1/cliente/';

export const editClientAPI = async (clientData: ClientWithId): Promise<apiNewClientResponse> => {
    try {
        const token = localStorage.getItem('authToken');
        console.log(clientData)
        const response = await axios.put(
            API_URL_EDIT_CLIENT+`${clientData.id}`,
            clientData, // <-- Envía los datos al cuerpo de la solicitud
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        console.log("Respuesta de la API:", response.data); // <-- Verifica la respuesta
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