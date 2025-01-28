import axios from "axios";
import { apiNewClientResponse } from "../utils/newClient-schema";

const API_URL_NEW_CLIENT = '/api/v1/cliente';

export const newClientRead = async (): Promise<apiNewClientResponse["data"]> => {
    try{
        const response = await axios.post(API_URL_NEW_CLIENT)
        const validatedData = apiNewClientResponse.parse(response.data)
        return validatedData.data
    }catch (error) {
        console.error("Error fetching new clients:", error);
        throw new Error("Failed to fetch new clients");
    }

}