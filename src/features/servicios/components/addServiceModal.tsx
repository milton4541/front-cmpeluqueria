import React, { useState } from "react";
import { newService } from "../types/service";

type AddServiceModalProps = {
  onSubmit: (service: newService) => void;
  isOpen: boolean;
  onClose: () => void;
};

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  onSubmit,
  isOpen,
  onClose,
}) => {

  // Estados para los campos del formulario
  const [description, setDescription] = useState("");
  const [estimatedTimeHours, setEstimatedTimeHours] = useState("");
  const [estimatedTimeMinutes, setEstimatedTimeMinutes] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Función para resetear el formulario
  const resetForm = () => {
    setDescription("");
    setEstimatedTimeHours("");
    setEstimatedTimeMinutes("");
    setName("");
    setPrice("");
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Crear el objeto newService
    const newService: newService = {
      description,
      estimated_time_hours: Number(estimatedTimeHours) || 0,
      estimated_time_minutes: Number(estimatedTimeMinutes) || 0,
      name,
      price: Number(price) || 0,
    };

    // Llamar a la función onSubmit
    onSubmit(newService);
    resetForm();
    onClose();
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Agregar Servicio</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium">Descripción</label>
              <input
                type="text"
                placeholder="Descripción del servicio"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Tiempo estimado (horas)
              </label>
              <input
                type="number"
                placeholder="2"
                value={estimatedTimeHours}
                onChange={(e) => setEstimatedTimeHours(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Tiempo estimado (minutos)
              </label>
              <input
                type="number"
                placeholder="30"
                value={estimatedTimeMinutes}
                onChange={(e) => setEstimatedTimeMinutes(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium">Nombre</label>
              <input
                type="text"
                placeholder="Nombre del servicio"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium">Precio</label>
              <input
                type="number"
                placeholder="1000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Agregar Servicio
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;