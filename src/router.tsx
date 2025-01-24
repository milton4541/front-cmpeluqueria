import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/pages";
import Layout from "./layouts/layout";
import Clientes from "./views/clientes";
import Login from "./views/login";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<Layout />}>
                    <Route path="/inicio" element={<Home />} />
                    <Route path="/clientes" element={<Clientes />} />
                    
                </Route>    
            </Routes>
        </BrowserRouter>
    );
}