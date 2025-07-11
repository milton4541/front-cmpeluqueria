import { useMemo, useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { FaEdit, FaTrash,FaUserPlus } from "react-icons/fa";
import ConfirmActionv from "../../../components/confirmActionn"; // Asegúrate que la importación sea correcta
import { IconButton } from "@mui/material"; // Asegúrate de tener este componente
import useRole from "../hooks/useRole"; // Hook ficticio para obtener roles
import React from "react";
import RoleForm from "./modals/addRoleModal";
import EditRoleModal from "./modals/editRoleModal";
import {Role} from "../types/role";

export default function RoleTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [expandedRoleId, setExpandedRoleId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { Role,addRole ,deleteRole, editRole } = useRole(); // Hook para obtener roles

  const togglePermissions = (roleId: number) => {
    setExpandedRoleId(expandedRoleId === roleId ? null : roleId);
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Nombre del Rol",
      },
      {
        id: "permisos",
        header: "Permisos",
        cell: ({ row }) => (
          <button
            onClick={() => togglePermissions(row.original.id)}
            className="text-blue-500 hover:text-blue-700"
          >
            {expandedRoleId === row.original.id ? "Ocultar" : "Mostrar"} permisos
          </button>
        ),
      },
      {
        id: "editar",
        header: "Editar",
        cell: ({ row }) => (
          <IconButton
            onClick={() => {
              setSelectedRole(row.original);
              setIsEditOpen(true);
            }}
            className="text-green-500 hover:text-green-700"
          >
            <FaEdit />
          </IconButton>
        ),
      },
      {
        id: "eliminar",
        header: "Eliminar",
        cell: ({ row }) => (
          <IconButton
            onClick={() => {
              setSelectedRoleId(row.original.id);
              setIsDeleteOpen(true);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash />
          </IconButton>
        ),
      },
    ],
    [expandedRoleId]
  );

  const table = useReactTable({
    data: Role,
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
            Agregar Rol <FaUserPlus />
          </button>
        </div>
      <ConfirmActionv
        isOpen={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          deleteRole(selectedRoleId);
          setIsDeleteOpen(false);
        }}
      />
      <RoleForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={(newRoleData) => {
          console.log("Datos recibidos en onSubmit:", newRoleData); // Debug
          addRole(newRoleData);
          setIsOpen(false);
        }}
        />

        {selectedRole && (
          <EditRoleModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            onSubmit={editRole}
            initialData={selectedRole}
          />
        )}
      
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-2 px-4 border-b cursor-pointer text-left text-xs font-medium text-gray-500 uppercase"
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
            <React.Fragment key={row.id}>
              <tr className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-2 px-4 border-b text-sm text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {expandedRoleId === row.original.id && (
                <tr>
                  <td colSpan={columns.length} className="py-2 px-4 border-b bg-gray-50">
                    <ul className="list-disc list-inside pl-5">
                      {row.original.permissions.map((permission: string, idx: number) => (
                        <li key={idx} className="text-sm">
                          {permission}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

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
