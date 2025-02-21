import { useEffect, useState } from "react"
import { editProduct, newProduct, product as Product } from "../types/product"
import { getProducts } from "../api/getProducts"
import { showNotification} from "../../../components/notification"
import { addProductApi } from "../api/addProducts"
import { deleteProductAPI } from "../api/deleteProduct"
import { editProductAPI } from "../api/editProduct"

export type ProductSliceType = {
    products: Product
    addProduct: newProduct
    fetchProducts: () => void
    deleteProduct: (id: number) => void
    editProduct: (product: Product) => void// Definir las columnas
}

export default function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
        
    const fetchProducts = async () => {
        // Llama a la API para obtener los productos
        const products = await getProducts(); 
        setProducts(products); 
    };
    
    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (newProduct: newProduct) => {
        try {
            await addProductApi(newProduct);
            fetchProducts();
            showNotification("success","Producto agregado exitosamente" );
        } catch (error) {
            showNotification("error","Error al agregar el producto");
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            await deleteProductAPI(id);
            fetchProducts();
            showNotification("success","Producto eliminado exitosamente" );
        } catch (error) {
            showNotification("error","Error al eliminar el producto");
        }
    }

    const editProduct = async (product: editProduct) => {
        try {
            await editProductAPI(product.id, product);
            fetchProducts();
            showNotification("success","Producto editado exitosamente" );
        } catch (error) {
            showNotification("error","Error al editar el producto");
        }
    }    


    return {
        products,
        addProduct,
        deleteProduct,
        editProduct
    }
}