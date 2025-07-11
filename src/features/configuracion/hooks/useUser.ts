import { showNotification } from "../../../components/notification";
import { addUsersAPI } from "../api/addUsers";
import { deleteUserAPI } from "../api/deleteUser";
import { editUserAPI } from "../api/editUser";
import { getUsers } from "../api/getUsers";
import { editUser, newUser, userT } from "../types/user";
import { useState, useEffect } from "react";

export type UserSliceType = {
    users: userT;
    fetchUser: () => Promise<void>;
    addUser: (newUser: newUser) => void;
    deleteUser: (id: number) => void;
    editUser: (id: number, user: editUser) => void;
};

export default function useUser() {
    const [users, setUsers] = useState<userT[]>([]);

    const fetchUser = async () => {
        try {
          const users = await getUsers(); // Obtener la lista de usuarios
          setUsers(users); // Actualizar el estado con los usuarios obtenidos
        } catch (error) {
          console.error("Error fetching users:", error); 
        }
      };

    useEffect(() => {
        fetchUser();
        console.log(users)
    }, []);

    const addUser = async (newUser: newUser) => {
        console.log(newUser);
        try {
            await addUsersAPI(newUser);
            fetchUser();
            showNotification("success", "Usuario agregado exitosamente");
        } catch (error) {
            showNotification("error", "Error al agregar el Usuario");
            console.error("Error adding service:", error);
        }
    }

    const deleteUser = async (id: number) => {
        try {
            await deleteUserAPI(id);
            fetchUser();
            showNotification("success", "Usuario eliminado exitosamente");
        } catch (error) {
            showNotification("error", "Error al eliminar el Usuario");
            console.error("Error deleting service:", error);
        }
    }

    const editUser = async (id: number, user: editUser) => {
        try {
            await editUserAPI(id, user);
            fetchUser();
            showNotification("success", "Usuario editado exitosamente");
        } catch (error) {
            showNotification("error", "Error al editar el Usuario");
            console.error("Error editing Usuario:", error); 
        }
    }    
    return {
        users,
        fetchUser,
        addUser,
        deleteUser,
        editUser
    };
}