import { Routes, Route } from "react-router-dom";
import ProductosPage from "../pages/ProductosPage";
import VerProducto from "../component/VerProducto";
import CrearProducto from "../component/CrearProducto";


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/productos/:id" element={<VerProducto />} />
      <Route path="/crear-producto" element={<CrearProducto />} />

      {/* Ruta por defecto */}
      <Route path="*" element={<ProductosPage />} />
    </Routes>
  );
};