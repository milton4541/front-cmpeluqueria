import { useState } from "react";
import UsersTable from "./UserTable";
import RolesTable from "./RolesTable";

export default function Config() {
    const [activeTab, setActiveTab] = useState<"users" | "roles">("users");

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Configuración</h1>

            {/* Botones de navegación */}
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => setActiveTab("users")}
                    className={`px-4 py-2 rounded ${activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Usuarios
                </button>
                <button
                    onClick={() => setActiveTab("roles")}
                    className={`px-4 py-2 rounded ${activeTab === "roles" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    Roles
                </button>
            </div>

            {/* Renderizado Condicional de Tablas */}
            {activeTab === "users" ? <UsersTable /> : <RolesTable />}
        </div>
    );
}
