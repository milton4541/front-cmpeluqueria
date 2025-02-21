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
import { editProduct, newProduct, product as Product } from "../types/product";
import useProducts from "../hooks/useProduct";
import ProductForm from "./modalAddProduct";
import ConfirmActionv from "../../../components/confirmActionn";
import EditProductModal from "./modalEditProduct";


export default function ProductTable() {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableSorting: true,
      },
      {
        accessorKey: "name",
        header: "Nombre",
      },
      {
        accessorKey: "brand",
        header: "Marca",
      },
      {
        accessorKey: "quantity",
        header: "Cantidad",
      },
      {
        accessorKey: "unit",
        header: "Unidad",
      },
      {
        accessorKey: "Editar",
        header: "Editar",
        cell: ({ row }) => {
          const product = row.original;
      
          return (
            <IconButton
              onClick={() => {
                setEditProductData({
                  id: product.id,
                  brand: product.brand,
                  name: product.name,
                  unit: product.unit,
                  low_stock_alert: 0, // Ajusta este valor si es necesario
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
              setSelectedProductId(row.original.id); // Guarda el ID del producto
              setIsDeleteOpen(true); // Abre el modal
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
  const { products, addProduct, deleteProduct,editProduct } = useProducts();
  const [editProductData, setEditProductData] = useState<editProduct | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    data: products,
    columns,
    state: {
        globalFilter, // Pasar el filtro global
      },
      onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const [isOpen, setIsOpen] = useState(false);  //para abrir modal de agregar cliente
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); //para abrir modal de editar cliente
  const [isEditOpen, setIsEditOpen] = useState(false); //para abrir modal de eliminar cliente
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null); //id para editar o eliminar

  
  const handleAddProduct =  (product: newProduct) => {
        addProduct(product); // Llama a tu API o slice de Redux
        setIsOpen(false); // Cierra el modal
  };

  const handleDelete = (id: number) => {
    console.log(`Eliminando el producto con id: ${id}`);
    deleteProduct(id);    
    setIsDeleteOpen(false);
  }

  const handleEdit = (product: editProduct) => {
    setEditProductData(product);
    editProduct(product);
    setIsEditOpen(false);
  };

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
          Agregar Producto <FaUserPlus />
        </button>
      </div>

      <ProductForm isOpen={isOpen} onSubmit={handleAddProduct} onClose={() => setIsOpen(false)} />
      <ConfirmActionv
        isOpen={isDeleteOpen}
        onConfirm={() => {
          if (selectedProductId !== null) {
            handleDelete(selectedProductId); // Elimina el producto con el ID almacenado
          }
          setIsDeleteOpen(false); // Cierra el modal después de confirmar
        }}
        onCancel={() => setIsDeleteOpen(false)}
      />    
        <EditProductModal 
          isOpen={isEditOpen} 
          product={editProductData ?? { id: 0, brand: "", name: "", unit: "", low_stock_alert: 0 }} 
          onSubmit={handleEdit} 
          onClose={() => setIsEditOpen(false)} 
        /> 
         <table className="min-w-full bg-white border border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  onClick={header.column.getToggleSortingHandler()} // Alternar ordenamiento
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {/* Mostrar el ícono de ordenamiento */}
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
         {table.getState().pagination.pageIndex + 1} De{" "}
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