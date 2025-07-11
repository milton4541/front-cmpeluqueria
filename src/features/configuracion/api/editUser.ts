import axios from "axios";
import { editUser } from "../types/user";


const API_EDIT_USER = '/api/v1/usuarios/';

export const editUserAPI = async (id: number, user: editUser): Promise<void> => {
    try {
        const token = localStorage.getItem('authToken');

        // Selecciona solo las propiedades necesarias
        const payload = {
            password: user.password,
            role_id: user.role_id,
            username: user.username,
        };

        // Depuración: Verifica el payload, el token y la URL
        console.log("Payload enviado desde el frontend:", payload);
        console.log("Token de autenticación:", token);
        console.log("URL de la solicitud:", API_EDIT_USER + `${id}`);
        console.log("Headers:", {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        });

        const response = await axios.put(
            API_EDIT_USER + `${id}`,
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Respuesta del Servidor:", response.data);
    } catch (error) {
        console.error("Error al editar el usuario:", error);

        if (axios.isAxiosError(error)) {
            // Registra la respuesta completa del servidor para depuración
            console.error("Respuesta del Servidor (Error):", error.response?.data);
            throw new Error(error.response?.data?.message || "No se pudo actualizar el usuario");
        } else {
            throw new Error("Ocurrió un error inesperado");
        }
    }
};