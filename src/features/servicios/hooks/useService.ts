import { useState, useEffect } from "react";
import { getServices } from "../api/getService";
import { service, newService, editService } from "../types/service";
import { addServiceAPI } from "../api/addService";
import { showNotification } from "../../../components/notification";
import { deleteServiceAPI } from "../api/deleteService";
import { editServiceAPI } from "../api/editService";

export type ServiceSliceType = {
    services: service;
    fetchServices: () => void;
    addService: (newService: newService) => void;
    deleteService: (id: number) => void;
    editService: (id: number, service: editService) => void;
};

export default function useServices() {
    const [services, setServices] = useState<service[]>([]);

    const fetchServices = async () => {
        const services = await getServices();
        setServices(services);
    };

    useEffect(() => {
        fetchServices();
        console.log(services)
    }, []);

    const addService = async (newService: newService) => {
        console.log(newService);
        try {
            await addServiceAPI(newService);
            fetchServices();
            showNotification("success", "Servicio agregado exitosamente");
        } catch (error) {
            showNotification("error", "Error al agregar el servicio");
            console.error("Error adding service:", error);
        }
    }

    const deleteService = async (id: number) => {
        try {
            await deleteServiceAPI(id);
            fetchServices();
            showNotification("success", "Servicio eliminado exitosamente");
        } catch (error) {
            showNotification("error", "Error al eliminar el servicio");
            console.error("Error deleting service:", error);
        }
    }

    const editService = async (id: number, service: editService) => {
        try {
            await editServiceAPI(id, service);
            fetchServices();
            showNotification("success", "Servicio editado exitosamente");
        } catch (error) {
            showNotification("error", "Error al editar el servicio");
            console.error("Error editing service:", error); 
        }
    }   

    return {
        services,
        fetchServices,
        addService,
        deleteService,
        editService,
    };
}