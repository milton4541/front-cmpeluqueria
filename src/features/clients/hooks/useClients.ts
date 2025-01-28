import { useState, useEffect } from "react";
import { getClients } from "../api/getClients";
import { apiResponseSchema, Client } from "../utils/client-schema";
import { newClientRead } from "../api/newClient";
import { apiNewClientResponse, newClient } from "../utils/newClient-schema";

export type ClientsSliceType = {
    clients: Client
    addClient: newClient
}

export default function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    
    useEffect(() => {
        const fetchClients = async () => {
        try {
            const clients = await getClients();
            const validateResponse = apiResponseSchema.parse(clients)
            setClients(validateResponse.data);
        } catch (error) {
            console.error("Error al obtener los clientes");
        }
        };
    
        fetchClients();
    }, []);
    
    

    const addClient = async () => { 
            try {
                const addClient = await newClientRead();
                const validateResponse = apiNewClientResponse.parse(addClient)
                if (validateResponse.status === "ok") {
                    const newClients = validateResponse.data.map(client => ({
                        ...client,
                        id: Date.now(), // Generar un ID temporal (o usar un valor por defecto)
                        appointments: [], // Agregar un array vacío de appointments
                    }));
                
                    setClients([...clients, ...newClients]);
                    await getClients();
                }
            } catch (error) {
                console.error("Error al obtener los clientes");
            }

    }

    return { clients, addClient };
}