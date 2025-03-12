import React, { useState, useEffect } from "react";
import { editService } from "../types/service";

interface EditServiceModalProps {
    isOpen: boolean;
    service: editService
    onClose: () => void;
    onSubmit: (service: editService) => void;
}

const EditServiceModal = ({ isOpen, service, onClose, onSubmit }: EditServiceModalProps) => {
    const [editedService, setEditedService] = useState(service);

    useEffect(() => {
        if (service) {
            setEditedService(service);
        }
    }, [service]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedService(prev => ({
            ...prev,
            [name]: name === "price" || name.includes("estimated_time") ? Number(value) : value
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(editedService); // Enviar el servicio actualizado al padre
        onClose(); // Cerrar modal después de guardar
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    Editar Servicio
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <label className="block text-gray-700">Descripción</label>
                    <input
                        type="text"
                        name="description"
                        value={editedService.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />

                    <label className="block text-gray-700">Tiempo Estimado (Horas)</label>
                    <input
                        type="number"
                        name="estimated_time_hours"
                        value={editedService.estimated_time_hours}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        min={0}
                    />

                    <label className="block text-gray-700">Tiempo Estimado (Minutos)</label>
                    <input
                        type="number"
                        name="estimated_time_minutes"
                        value={editedService.estimated_time_minutes}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        min={0}
                    />

                    <label className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={editedService.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />

                    <label className="block text-gray-700">Precio</label>
                    <input
                        type="number"
                        name="price"
                        value={editedService.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        min={0}
                    />

                    <div className="flex justify-center space-x-4 mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-all"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditServiceModal;
