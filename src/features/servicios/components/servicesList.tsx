import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IconButton } from '@mui/material';
import { FaUserPlus } from 'react-icons/fa';
import { flexRender } from "@tanstack/react-table";
import { editService, service } from "../types/service";
import useServices from "../hooks/useService";
import AddServiceModal from "./addServiceModal";
import ConfirmActionv from "../../../components/confirmActionn";
import EditServiceModal from "./editServiceModal";



export default function ServicesList() {
  const columns = useMemo<ColumnDef<service>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Código",
        enableSorting: true,
      },
      {
        accessorKey: "description",
        header: "Descripción",
      },
      {
        accessorKey: "estimated_time_minutes",
        header: "Tiempo estimado",
        cell: ({ row }) => {
          const time = convertMinutesToHoursAndMinutes(row.original.estimated_time_minutes);
          return `${time.hours}h ${time.minutes}m`;
        },
      },
      {
        accessorKey: "name",
        header: "Nombre",
      },
      {
        accessorKey: "price",
        header: "Precio",
        cell: ({ row }) => `$${row.original.price.toFixed(2)}`, // Formatear el precio
      },
      {
        accessorKey: "Editar",
        header: "Editar",
        cell: ({ row }) => {
          const service = row.original;
          return (
            <IconButton
              onClick={() => {
                const time = convertMinutesToHoursAndMinutes(service.estimated_time_minutes);
                setEditServiceData({
                  id: service.id,
                  description: service.description,
                  estimated_time_hours: time.hours,
                  estimated_time_minutes: time.minutes,
                  name: service.name,
                  price: service.price,
                });
                setIsEditOpen(true);
              }}
              className="text-blue-500 hover:text-blue-700 transition-all"
            >
              <FaEdit />
            </IconButton>
          );
        },
      },
      {
        accessorKey: "Eliminar",
        header: "Eliminar",
        cell: ({ row }) => (
          <IconButton
            onClick={() => {
              setIsDeleteOpen(true);
              setSelectedProductId(row.original.id);
            }}
            className="text-red-500 hover:text-red-700 transition-all"
          >
            <FaTrash />
          </IconButton>
        ),
      },
    ],
    []
  );
  const convertMinutesToHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60); // Obtener las horas
    const minutes = totalMinutes % 60; // Obtener los minutos restantes
    return { hours, minutes };
  };
  const {services, addService, deleteService,editService} = useServices();
  const [globalFilter, setGlobalFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editServiceData, setEditServiceData] = useState<editService | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const table = useReactTable({
    data: services, // servicios
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
          className="px-4 py-2 border border-gray-300 rounded"
        />

        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded flex items-center gap-2"
        >
          Agregar Servicio <FaUserPlus />
        </button>
      </div>

        <AddServiceModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={addService}/>


       <ConfirmActionv
        isOpen={isDeleteOpen}
        onConfirm={() => {
          if (selectedProductId !== null) {
            deleteService(selectedProductId);
          }          setIsDeleteOpen(false);
        }}
        onCancel={() => setIsDeleteOpen(false)}
      /> 

      <EditServiceModal
        isOpen={isEditOpen}
        service={editServiceData || {id: 0, description: "", estimated_time_hours: 0, estimated_time_minutes: 0, name: "", price: 0}}
        onSubmit={(service) => {
          console.log("Editando servicio con id: ", selectedProductId);
          if (editServiceData !== null && editServiceData.id !== null) {
            editService(editServiceData.id, service);
          }
        }}        onClose={() => setIsEditOpen(false)}
      />

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          {table.getState().pagination.pageIndex + 1} De {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}