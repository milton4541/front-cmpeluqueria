import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Íconos de ojo abierto y cerrado
import { editUser } from "../../types/user";
import { Role } from "../../types/role";
import { getRolAPI } from "../../api/getRol";

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: number, user: editUser) => void;
  initialData: {
    id: number;
    password: string;
    username: string;
    role_id: number;
    role_name: string;
  };
};

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  // Estado para manejar los datos del formulario
  const [user, setUser] = useState<editUser>({
    id: initialData.id,
    username: initialData.username,
    password: initialData.password || "", // Usar la contraseña inicial si existe
    role_id: initialData.role_id,
    role_name: initialData.role_name,
  });

  // Estado para manejar la lista de roles
  const [roles, setRoles] = useState<Role[]>([]);

  // Estado para manejar errores
  const [error, setError] = useState("");

  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Obtener los roles al abrir el modal
  useEffect(() => {
    if (isOpen) {
      const fetchRoles = async () => {
        try {
          const response = await getRolAPI();
          setRoles(response.data);

          // Establecer el role_id automáticamente si hay coincidencia exacta
          const matchedRole = response.data.find(
            (role) => role.name === initialData.role_name
          );
          if (matchedRole) {
            setUser((prevUser) => ({
              ...prevUser,
              role_id: matchedRole.id,
            }));
          }
        } catch (error) {
          setError("Error al cargar los roles");
        }
      };

      fetchRoles();
    }
  }, [isOpen, initialData.role_name]);

  // Actualizar el estado del usuario cuando cambie initialData
  useEffect(() => {
    setUser({
      id: initialData.id,
      username: initialData.username,
      password: initialData.password || "", // Usar la contraseña inicial si existe
      role_id: initialData.role_id,
      role_name: initialData.role_name,
    });
  }, [initialData]);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === "role_id" ? Number(value) : value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que el role_id sea válido
    if (!user.role_id) {
      setError("Selecciona un rol válido");
      return;
    }

    // Enviar los datos del formulario
    onSubmit(initialData.id, user);

    // Cerrar el modal
    onClose();

    // Resetear el estado del usuario (opcional)
    setUser({
      id: 0,
      username: "",
      password: "",
      role_id: 0,
      role_name: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Editar Usuario</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            {/* Campo para el nombre de usuario */}
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium">Nombre de usuario</label>
              <input
                type="text"
                name="username"
                placeholder="nuevo_usuario"
                value={user.username}
                onChange={handleInputChange}
                className="border p-2 w-full"
                required
              />
            </div>

            {/* Campo para la nueva contraseña (opcional) */}
            <div className="col-span-2 relative">
              <label className="block mb-2 text-sm font-medium">Nueva Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Dejar en blanco para no cambiar"
                value={user.password || ""}
                onChange={handleInputChange}
                className="border p-2 w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                style={{ top: "55%" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Campo para seleccionar el rol */}
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium">Rol</label>
              <select
                name="role_id"
                value={user.role_id}
                onChange={handleInputChange}
                className="border p-2 w-full"
                required
              >
                <option value="" disabled>
                  Selecciona un rol
                </option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Guardar Cambios
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;