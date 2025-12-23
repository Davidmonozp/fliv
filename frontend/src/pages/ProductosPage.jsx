import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/productosPage.css";
import logoFliv from "../assets/logo-fliv.jpg";

export default function ProductosPage() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const resp = await axios.get("http://127.0.0.1:8000/api/productos");
                setProductos(resp.data);
            } catch (error) {
                console.error(error);
                Swal.fire("Error", "No se pudieron cargar los productos", "error");
            }
        };

        fetchProductos();
    }, []); // ✅ solo una vez

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#d33",
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/eliminar-productos/${id}`);

            setProductos(prev =>
                prev.filter(producto => producto.id !== id)
            );

            Swal.fire("Eliminado", "Producto eliminado correctamente", "success");
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudo eliminar el producto", "error");
        }
    };

    return (
        <>
            <div className="productos-container">
                <img className="logo-fliv" src={logoFliv} alt="fliv" />
                <h1 className="title-productos">Lista de Productos</h1>

                {productos.length === 0 && (
                    <p className="empty-text">No hay productos registrados</p>
                )}

                <div className="cards-grid">
                    {productos.map(producto => (
                        <div className="producto-card" key={producto.id}>
                            {producto.imagen && (
                                <img
                                    src={`http://127.0.0.1:8000/storage/${producto.imagen}`}
                                    alt={producto.nombre}
                                    className="producto-image"
                                />
                            )}

                            <h3>{producto.nombre}</h3>
                            <p><strong>Precio:</strong> ${producto.precio}</p>
                            <p><strong>Cantidad:</strong> {producto.cantidad}</p>

                            <div className="producto-buttons">
                                <Link to={`/productos/${producto.id}`} className="btn-view">
                                    Ver / Editar
                                </Link>

                                <button
                                    onClick={() => handleDelete(producto.id)}
                                    className="btn-delete"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="register-container">
                    <Link to="/crear-producto" className="btn-register">
                        Registrar Nuevo Producto
                    </Link>
                </div>
            </div>
        </>
    );
}
