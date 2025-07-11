import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { newRole } from "../../types/role";

// Props
type RoleFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newRole: newRole) => void;
};

// Lista de permisos posibles (puedes cargar esto desde una API si lo prefieres)
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

const RoleForm: React.FC<RoleFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Limpiar el formulario al abrir
      setRoleName("");
      setSelectedPermissions([]);
    }
  }, [isOpen]);

  const handlePermissionToggle = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: roleName, permission_names: selectedPermissions });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Agregar Nuevo Rol</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Nombre del rol */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Nombre del Rol</label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
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
                    checked={selectedPermissions.includes(permission)}
                    onChange={() => handlePermissionToggle(permission)}
                    className="form-checkbox h-4 w-4"
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Crear Rol
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoleForm;
