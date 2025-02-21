import { editProduct } from "../types/product";
import React, { useState, useEffect } from "react";

interface EditProductModalProps {
    isOpen: boolean;
    product: editProduct;
    onClose: () => void;
    onSubmit: (product: editProduct) => void;
}

const EditProductModal = ({ isOpen, product, onClose, onSubmit }: EditProductModalProps) => {
    const [editedProduct, setEditedProduct] = useState<editProduct>({
        id: product.id,
        brand: "",
        low_stock_alert: 0,
        name: "",
        unit: ""
    });

    useEffect(() => {
        if (product) {
            setEditedProduct(product);
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct(prev => ({
            ...prev,
            [name]: name === "low_stock_alert" ? Number(value) : value
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(editedProduct); // Enviar el producto actualizado al padre
        onClose(); // Cerrar modal después de guardar
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            {/* Botón de cerrar */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
                &times;
            </button>
    
            {/* Título */}
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                Editar Producto
            </h2>
    
            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-3">
                <label className="block text-gray-700">Marca</label>
                <input
                    type="text"
                    name="brand"
                    value={editedProduct.brand}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                />
    
                <label className="block text-gray-700">Stock Mínimo</label>
                <input
                    type="number"
                    name="low_stock_alert"
                    value={editedProduct.low_stock_alert}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                />
    
                <label className="block text-gray-700">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                />
    
                <label className="block text-gray-700">Unidad</label>
                <input
                    type="text"
                    name="unit"
                    value={editedProduct.unit}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                />
    
                {/* Botones */}
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

export default EditProductModal;