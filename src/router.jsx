import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Biblioteca from "./pages/Biblioteca";
import JuegoDetalle from "./pages/JuegoDetalle";
import Login from "./pages/Login";
import Coleccion from "./pages/Coleccion";
import Completados from "./pages/Completados";
import Reseñas from "./pages/Resenias";

export default function Router() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Biblioteca />} />
                <Route path="/juego/:id" element={<JuegoDetalle />} />
                <Route path="/login" element={<Login />} />
                <Route path="/coleccion" element={<Coleccion />} />
                <Route path="/completados" element={<Completados />} />
                <Route path="/resenias" element={<Reseñas />} />
            </Routes>
        </BrowserRouter>
    );
}
