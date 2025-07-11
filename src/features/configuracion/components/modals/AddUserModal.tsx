import React, { useState, useEffect } from "react";
import { getRolAPI } from "../../api/getRol";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Role } from "../../types/role";
import { newUser } from "../../types/user";



type UserFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: { username: string; password: string; role_id: number }) => void;
};

const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [user, setUser] = useState<newUser>({
    username: "",
    password: "",
    role_id: 0,
  });
  const [roles, setRoles] = useState<Role[]>([]); // Estado para almacenar los roles
  const [showPassword, setShowPassword] = useState(false);

  // Obtener los roles al abrir el modal
  useEffect(() => {
    if (isOpen) {
      const fetchRoles = async () => {
        try {
          const response = await getRolAPI();
          setRoles(response.data); // Almacenar los roles en el estado
        } catch (error) {
          console.error("Error getting roles:", error);}
      };

      fetchRoles();
    }
  }, [isOpen]);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === "role_id" ? Number(value) : value, // Convertir a número si es el campo role_id
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Llamar a la función onSubmit con los datos del nuevo usuario
    onSubmit({ username: user.username, password: user.password, role_id: user.role_id });
    onClose(); // Cerrar el modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Agregar Usuario</h3>
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

            {/* Campo para la contraseña */}
            <div className="col-span-2 relative">
              <label className="block mb-2 text-sm font-medium">Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="contraseña123"
                value={user.password}
                onChange={handleInputChange}
                className="border p-2 w-full pr-10"
                required
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
            Agregar Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;