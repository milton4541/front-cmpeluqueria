import React, { useState } from "react";
import { Client } from "../types/client";

type ClientFormProps = {
    onSubmit: (client: Client) => void; // Función para manejar el envío del formulario
};

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit }) => {
    const [name, setName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(name,last_name,email,phone)
            const success = await onSubmit({
                email,
                last_name,
                name,
                phone,
            });
    
            // Si se agregó correctamente, resetea el formulario
            if (success !== undefined) {
                setName("");
                setLastName("");
                setEmail("");
                setPhone("");
            }
        } catch (error) {
            console.error("Error en el formulario:", error);
        }
    };

    return (
        <>
        <div className="relative bg-white rounded-lg shadow-sm :bg-gray-700">
    {/* Modal header */}
    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 :text-white">
            Agregar Cliente
        </h3>
 
    </div>

    {/* Modal body */}
    <form onSubmit={handleSubmit} className="p-4 md:p-5">
        <div className="grid gap-4 mb-4 grid-cols-2">
            {/* Nombre */}
            <div className="col-span-2">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">
                    Nombre
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                    placeholder="Mario"
                    required
                />
            </div>

            {/* Apellido */}
            <div className="col-span-2 sm:col-span-1">
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 :text-white">
                    Apellido
                </label>
                <input
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                    placeholder="Mendez"
                    required
                />
            </div>

            {/* Telefono */}
            <div className="col-span-2 sm:col-span-1">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 :text-white">
                    Telefono
                </label>
                <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500  [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="3434655099"
                    required
                />
            </div>

            {/* Email */}
            <div className="col-span-2">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 :text-white">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                    placeholder="Peluqueria@example.com"
                    required
                />
            </div>
        </div>

        {/* Botón de agregar */}
        <button
            type="submit"
            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800"
        >
            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                />
            </svg>
            Agregar Cliente
        </button>
    </form>
</div>
</>
    );
};

export default ClientForm;