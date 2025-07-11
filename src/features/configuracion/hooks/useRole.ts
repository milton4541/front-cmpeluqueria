import { useEffect, useState } from "react";
import { editRole, newRole, Role } from "../types/role";
import { getRolAPI } from "../api/getRol";
import { deleteRoleAPI } from "../api/deleteRole";
import { showNotification } from "../../../components/notification";
import { addRoleAPI } from "../api/addRole";
import editRoleAPI from "../api/editRole";

export type RoleSliceType = {
    Role: Role;
    fetchRole: () => Promise<void>;
    deleteRole: (id: number) => void;
    addRole: (newRole: Role) => void;
    editRole: (id: number, role: editRole) => void;
};

export default function useRole() {
    const [Role, setRole] = useState<Role[]>([]);

    const fetchRole = async () => {
        try {
          const Role = await getRolAPI(); // Obtener la lista de roles
          setRole(Role.data); // Actualizar el estado con los roles obtenidos
        } catch (error) {
          console.error("Error fetching roles:", error); 
        }
      };

    useEffect(() => {
        fetchRole();
        console.log(Role)
    }, []);

    const addRole = async (newRole: newRole) => {
        try {
            console.log(newRole);
            await addRoleAPI(newRole);
            fetchRole();
            showNotification("success", "Rol agregado exitosamente");
        } catch (error) {
            showNotification("error", "Error al agregar el Rol");
            console.error("Error adding role:", error);
        }
    }    

    const deleteRole = async (id: number) => {
        try {
            await deleteRoleAPI(id);
            fetchRole();
            showNotification("success", "Rol eliminado exitosamente");
        } catch (error) {
            showNotification("error", "Error al eliminar el Rol");
            console.error("Error deleting role:", error);
        }
    }

    const editRole = async (role: editRole) => {
        try {
            await editRoleAPI(role);
            fetchRole();
            showNotification("success", "Rol editado exitosamente");
        } catch (error) {
            showNotification("error", "Error al editar el Rol");
            console.error("Error editing role:", error);
        }
    }

    return { 
        Role, 
        fetchRole,
        addRole,
        deleteRole,
        editRole
    };
}