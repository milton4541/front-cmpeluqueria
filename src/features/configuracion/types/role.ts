export type Role = {
    id: number;
    name: string;
    permissions: string[]; // Permisos como un array de strings
  };
  
  // Tipo para la respuesta de la API
  export type RoleResponse = {
    data: Role[];
    message: string;
    status: string;
  };

export type newRole = {
    name: string;
    permission_names: string[];
  };
  
  export type editRole = {
    id: number;
    name: string;
    permission_names: string[];
  };