import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaUserPlus } from 'react-icons/fa';
import { IconButton } from "@mui/material";
import { editUser, userT } from "../types/user";
import useUser from "../hooks/useUser";
import UserForm from "./modals/AddUserModal";
import ConfirmActionv from "../../../components/confirmActionn";
import EditUserModal from "./modals/editUserModal";

export default function UserTable() {
  // Definición de columnas
  const columns = useMemo<ColumnDef<userT>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "username",
        header: "Usuario",
      },
      {
        accessorKey: "role_name",
        header: "Rol",
      },
      {
        accessorKey: "Editar",
        header: "Editar",
        cell: ({ row }) => (
          <IconButton
            onClick={() => {
              setEditUserData({
                id: row.original.id,
                password: "",
                username: row.original.username,
                role_id: 100,
                role_name: row.original.role_name,
              });
              setSelectedUserId(row.original.id),
              setIsEditOpen(true);
            }} 
            className="text-blue-500 hover:text-blue-700 transition-all"
          >
            <FaEdit />
          </IconButton>
        ),
      },
      {
        accessorKey: "Eliminar",
        header: "Eliminar",
        cell: ({ row }) => (
          <IconButton
            onClick={() =>{ setSelectedUserId(row.original.id); setIsDeleteOpen(true);}} // Descomenta y añade la lógica de eliminación
            className="text-red-500 hover:text-red-700 transition-all"
          >
            <FaTrash />
          </IconButton>
        ),
      },
    ],
    []
  );

  // Estado para el filtro global
  const [globalFilter, setGlobalFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUsertId, setSelectedUserId] = useState<number>(0);
  const [IsEditOpen, setIsEditOpen] = useState(false);
  const [editUserData, setEditUserData] = useState<editUser | null>(null);


  // Obtener los usuarios del hook useUser
  const { users, addUser, deleteUser, editUser } = useUser();

  // Configuración de la tabla
  const table = useReactTable({
    data: users,
    columns,
    state: { globalFilter },
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
            Agregar Usuario <FaUserPlus />
          </button>
        </div>
        <UserForm isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={addUser} />
        <ConfirmActionv isOpen={isDeleteOpen} 
            onConfirm={() => {
              if (selectedUsertId !== null) {
                deleteUser(selectedUsertId);
              }          setIsDeleteOpen(false);
            }}
          onCancel={() => setIsDeleteOpen(false)} />
          <EditUserModal isOpen={IsEditOpen} onClose={() => setIsEditOpen(false)} onSubmit={editUser} initialData={editUserData || { id:selectedUsertId, password: "", username: "", role_id: 0,role_name: "" }} />
      {/* Tabla */}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={header.column.getToggleSortingHandler()} // Ordenar al hacer clic
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
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
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