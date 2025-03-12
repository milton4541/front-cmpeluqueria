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
import { userT } from "../types/user";


export default function UserTable(users: userT , editUser: userT, deleteUser: (id :number)=>void) {
  const columns = useMemo<ColumnDef<userT>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "role_name",
        header: "Rol",
      },
      {
        accessorKey: "username",
        header: "Usuario",
      },
      {
        accessorKey: "Editar",
        header: "Editar",
        cell: ({ row }) => (
          <IconButton
            onClick={() => editUser(row.original)}
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
            onClick={() => deleteUser(row.original.id)}
            className="text-red-500 hover:text-red-700 transition-all"
          >
            <FaTrash />
          </IconButton>
        ),
      },
    ],
    []
  );

  const [globalFilter, setGlobalFilter] = useState("");
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
      <input
        type="text"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Buscar..."
        className="px-4 py-2 border border-gray-300 rounded mb-4"
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
                  {header.column.columnDef.header}
                  {header.column.getIsSorted() === 'asc' ? ' 🔼' : header.column.getIsSorted() === 'desc' ? ' 🔽' : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                  {cell.column.columnDef.cell ? cell.column.columnDef.cell({ row }) : cell.getValue()}
                </td>
              ))}
            </tr>
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
        <span>{table.getState().pagination.pageIndex + 1} de {table.getPageCount()}</span>
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
