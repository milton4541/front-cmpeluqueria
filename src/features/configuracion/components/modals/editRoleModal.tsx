import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { editRole, Role } from "../../types/role";

// Define la estructura de los datos del rol que vas a editar
type EditRoleModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (updatedRole: editRole) => void; // Ahora recibe el objeto completo
    initialData: Role;
  };
  

const ALL_PERMISSIONS = [
    "create_appointment",
    "update_appointment",
    "delete_appointment",
    "create_service",
    "update_service",
    "delete_service",
    "create_product",
    "update_product",
    "delete_product",
    "create_user",
    "update_user",
    "delete_user",
    "create_role",
    "update_role",
    "delete_role",
    "create_client",
    "update_client",
    "delete_client",
    "restock_product",
];

const EditRoleModal: React.FC<EditRoleModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  // Estado local para el rol que se está editando
  const [role, setRole] = useState({
    id: initialData.id,
    name: initialData.name,
    permission_names: initialData.permissions,
  });
  const [error, setError] = useState("");

  // Cuando el modal se abre o cambia initialData, actualizamos el estado local
  useEffect(() => {
    if (isOpen) {
      setRole({
        id: initialData.id,
        name: initialData.name,
        permission_names: initialData.permissions,
      });
    }
  }, [isOpen, initialData]);

  // Maneja el cambio en el input del nombre
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole({ ...role, name: e.target.value });
  };

  // Alterna un permiso en el checklist
  const handlePermissionToggle = (permission: string) => {
    if (role.permission_names.includes(permission)) {
      setRole({ ...role, permission_names: role.permission_names.filter((p) => p !== permission) });
    } else {
      setRole({ ...role, permission_names: [...role.permission_names, permission] });
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role.name.trim() === "") {
      setError("El nombre del rol no puede estar vacío");
      return;
    }
    onSubmit(role);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Editar Rol</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Campo para el nombre del rol */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Nombre del Rol</label>
            <input
              type="text"
              value={role.name}
              onChange={handleNameChange}
              className="border p-2 w-full"
              placeholder="empleado"
              required
            />
          </div>

          {/* Checklist de permisos */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Permisos</label>
            <div className="grid grid-cols-2 gap-2">
              {ALL_PERMISSIONS.map((permission) => (
                <label key={permission} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={role.permission_names.includes(permission)}
                    onChange={() => handlePermissionToggle(permission)}
                    className="form-checkbox h-4 w-4"
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRoleModal;
