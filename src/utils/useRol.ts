import { useState, useEffect } from "react";
import axios from "axios";
import { Role } from "../features/configuracion/types/role";
import { useLogin } from "../features/login/hooks/useLogin";

const ROLE_URL_API = "/api/rol";
const {username} = useLogin()

const useFetchRol = (userRoleName: string) => {
  const [roles, setRoles] = useState<Role[] | null>(null);

  // Función para obtener los roles desde la API
  const fetchRol = async () => {
    try {
      const response = await axios.get(ROLE_URL_API);
      // Se asume que la respuesta tiene la forma { rol: Role[] }
      setRoles(response.data.rol);
    } catch (err) {
      console.error("Error fetching rol:", err);
    } 
  };

  // Se ejecuta al montar el hook
  useEffect(() => {
    fetchRol();
  }, []);

  // Función para validar si el rol del usuario tiene determinado permiso
  const hasPermission = (permission: string): boolean => {
    if (!roles) {
      console.error("Roles no cargados aún");
      return false;
    }
    // Busca el rol del usuario (comparación en minúsculas para evitar problemas de mayúsculas/minúsculas)
    const role = roles.find(
      (r) => r.name.toLowerCase() === userRoleName.toLowerCase()
    );
    return role ? role.permissions.includes(permission) : false;
  };

  return { roles, hasPermission };
};

export default useFetchRol;
