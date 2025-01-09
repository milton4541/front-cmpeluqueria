import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/pages";
import Layout from "./layouts/layout";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                </Route>    
            </Routes>
        </BrowserRouter>
    );
}