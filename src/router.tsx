import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/pages";
import Productos from "./views/productos";
import Layout from "./layouts/layout";
import Clientes from "./views/clientes";
import Login from "./views/login";
import Notification from "./components/notification";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Notification />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<Layout />}>
                    <Route path="/inicio" element={<Home />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/productos" element={<Productos />} />
                    
                </Route>    
            </Routes>
        </BrowserRouter>
    );
}