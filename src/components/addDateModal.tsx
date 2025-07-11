import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getClients } from "../features/clients/api/getClients";
import { ClientWithId } from "../features/clients/types/client";
import { getServices } from "../features/servicios/api/getService";
import { service } from "../features/servicios/types/service";
import { addTurnoAPI } from "../services/api/addTurno";
import { showNotification } from "./notification";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
};

const AppointmentModal: React.FC<Props> = ({ isOpen, onClose, selectedDate }) => {
  const [clientId, setClientId] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [clientes, setClientes] = useState<ClientWithId[]>([]);
  const [services, setServices] = useState<service[]>([]);

  useEffect(() => {
    if (isOpen) {
      setClientId(null);
      setSelectedServices([]);

      const fetchClientes = async () => {
        try {
          const response = await getClients();
          setClientes(response);
        } catch (error) {
          console.error("Error al cargar clientes:", error);
        }
      };

      const fetchServices = async () => {
        try {
          const response = await getServices();
          setServices(response);
        } catch (error) {
          console.error("Error al cargar servicios:", error);
        }
      };

      fetchClientes();
      fetchServices();
    }
  }, [isOpen]);


  const formatDateForAPI = (isoDate: string) => {
    const date = new Date(isoDate);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;

    addTurnoAPI({ //hacerle try catch
      appointment_date: formatDateForAPI(selectedDate),
      client_id: clientId,
      service_id: selectedServices,
    });
    showNotification("success", "Cita creada correctamente");

    onClose();
  };

  const clientOptions = clientes.map((cliente) => ({
    value: cliente.id,
    label: cliente.name,
  }));
  const serviceOptions = services.map((service) => ({
    value: service.id,
    label: service.name,
  }));

  return !isOpen ? null : (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Crear Cita</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Fecha seleccionada:</label>
            <p>{formatDateForAPI(selectedDate)}</p>
          </div>

          {/* Cliente con react-select */}
          <div>
            <label className="block text-sm font-medium mb-1">Cliente:</label>
            <Select
              options={clientOptions}
              value={clientOptions.find((opt) => opt.value === clientId) || null}
              onChange={(selected) => setClientId(selected ? selected.value : null)}
              placeholder="Selecciona un cliente..."
              isSearchable
              className="text-sm"
            />
          </div>

          {/* Servicios con checkboxes */}
        <div>
            <label className="block text-sm font-medium mb-1">Servicios:</label>
            <Select
                options={serviceOptions}
                isMulti
                placeholder="Selecciona uno o más servicios..."
                className="text-sm"
                value={serviceOptions.filter((opt) => selectedServices.includes(opt.value))}
                onChange={(selectedOptions) =>
                setSelectedServices(selectedOptions.map((opt) => opt.value))
                }
            />
        </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={!clientId}
              onClick={handleSubmit}
            >
              Guardar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
