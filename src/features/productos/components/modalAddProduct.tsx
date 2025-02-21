import React, { useState } from "react";
import { newProduct } from "../types/product";

type ProductFormProps = {
    onSubmit: (product: newProduct) => void;
    isOpen: boolean;
    onClose: () => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, isOpen, onClose }) => {
    const [brand, setBrand] = useState("");
    const [name, setName] = useState("");
    const [lowStockAlert, setLowStockAlert] = useState("");
    const [packageCount, setPackageCount] = useState("");
    const [unit, setUnit] = useState("");
    const [unitPerPackage, setUnitPerPackage] = useState("");
    const [unityPrice, setUnityPrice] = useState("");

    const resetForm = () => {
        setBrand("");
        setName("");
        setLowStockAlert("");
        setPackageCount("");
        setUnit("");
        setUnitPerPackage("");
        setUnityPrice("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ brand, name,low_stock_alert: Number(lowStockAlert) || 0, package_count: Number(packageCount) || 0, unit,unit_per_package: Number(unitPerPackage) || 0, unity_price: Number(unityPrice) || 0 });
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Agregar Producto</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium">Marca</label>
                            <input type="text" placeholder="Dove" value={brand} onChange={(e) => setBrand(e.target.value)} className="border p-2 w-full" required />
                        </div>
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium">Nombre</label>
                            <input type="text" placeholder="Shampoo anti caspa" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Stock Mínimo</label>
                            <input type="number" placeholder="10" value={lowStockAlert} onChange={(e) => setLowStockAlert(e.target.value)}   className="border p-2 w-full appearance-none" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Unidades por Paquete</label>
                            <input type="number" placeholder="20" value={unitPerPackage} onChange={(e) => setUnitPerPackage(e.target.value)} className="border p-2 w-full" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Cantidad de Paquetes</label>
                            <input type="number" placeholder="5" value={packageCount} onChange={(e) => setPackageCount(e.target.value)} className="border p-2 w-full" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Unidad</label>
                            <input type="text" placeholder="Ml, Gr, Kg" value={unit} onChange={(e) => setUnit(e.target.value)} className="border p-2 w-full" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium">Precio Unitario</label>
                            <input type="number" placeholder="2000$" value={unityPrice} onChange={(e) => setUnityPrice(e.target.value)} className="border p-2 w-full" required />
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Agregar Producto</button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
