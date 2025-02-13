import { useState, useEffect } from "react";
import { getClients } from "../api/getClients";
import { Client } from "../utils/client-schema";
import { newClientRead } from "../api/newClient";
import { newClient } from "../utils/newClient-schema";
import { showNotification } from '../../../components/notification';
import { Client as clients, ClientWithId } from "../types/client";
import { deleteClientAPI } from "../api/deleteClient";
import { editClientAPI } from "../api/editClient";
export type ClientsSliceType = {
    clients: Client
    addClient: newClient
    fetchClients: () => void
    deleteClient: (id: number) => void
    editClient: (client: ClientWithId) => void
}

export default function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
        
    const fetchClients = async () => {
        // Llama a la API para obtener los clientes
        const clients = await getClients(); 
        setClients(clients); 
    };
    
    useEffect(() => {
        fetchClients();
    }, []);

    const addClient = async (client: clients) => { 
        try{
        // Llama a la API para crear el cliente
        await newClientRead(client); 
        showNotification('success','Cliente creado correctamente');
        await fetchClients(); //refresca datos
        } catch (error) {
            const errorMessage = (error as Error).message || 'Ocurrió un error desconocido';
            showNotification('error', errorMessage);
        }
    }

    const deleteClient = async (id: number) => {
        try {
            // Llama a la API para eliminar el cliente
            await deleteClientAPI(id);
            showNotification('success','Cliente eliminado correctamente');
            await fetchClients(); //refresca datos
        } catch (error) {
            const errorMessage = (error as Error).message || 'Ocurrió un error desconocido';
            showNotification('error', errorMessage);
        }
    }

    const editClient = async (client: ClientWithId) => {
        try {
            await editClientAPI(client);
            showNotification('success','Cliente editado correctamente');
            await fetchClients(); //refresca datos
            console.log("refresca datos")
        } catch (error) {
            const errorMessage = (error as Error).message || 'Ocurrió un error desconocido';
            showNotification('error', errorMessage);
        }    
    }



    return { clients, addClient, deleteClient, editClient };
}