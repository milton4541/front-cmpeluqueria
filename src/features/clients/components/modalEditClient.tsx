import { useState, useEffect } from "react";
import { ClientWithId } from "../types/client";

type ClientFormProps = {
    client: ClientWithId;
    onSubmit: (client: ClientWithId) => void;
};

const ClientEditForm: React.FC<ClientFormProps> = ({ client, onSubmit }) => {
    const [name, setName] = useState(client.name);
    const [lastName, setLastName] = useState(client.last_name);
    const [email, setEmail] = useState(client.email);
    const [phone, setPhone] = useState(client.phone);

    // 🔄 Sincroniza los valores del formulario cuando `client` cambie
    useEffect(() => {
        setName(client.name);
        setLastName(client.last_name);
        setEmail(client.email);
        setPhone(client.phone);
    }, [client]); // <-- Se ejecuta cuando `client` cambia

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...client,
            name,
            last_name: lastName,
            email,
            phone,
        });
    };

    return (
        <div className="relative bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                    Editar Cliente
                </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            required
                        />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
                            Apellido
                        </label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            required
                        />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                            Teléfono
                        </label>
                        <input
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            required
                        />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default ClientEditForm;
