import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/CrearProducto.css";
import logo from "../assets/logo.jpg";


export default function CrearProducto() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        cantidad: "",
        imagen: null,
    });

    // manejar cambios en inputs
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "imagen") {
            setForm({ ...form, imagen: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("nombre", form.nombre);
        data.append("precio", form.precio);
        data.append("cantidad", form.cantidad);

        if (form.imagen) {
            data.append("imagen", form.imagen);
        }

        try {
            await axios.post("http://127.0.0.1:8000/api/crear-productos", data);

            Swal.fire({
                icon: "success",
                title: "Producto creado",
                text: "El producto se registró correctamente.",
                confirmButtonColor: "#3085d6",
            });

            navigate("/productos");

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo registrar el producto.",
                confirmButtonColor: "#d33",
            });

            console.error("Error guardando el producto:", error);
        }
    };

    return (
        <div className="producto-container">
            <div>
                <img className="logo" src={logo} alt="fliv" />
            </div>
            <form onSubmit={handleSubmit} className="producto-form">
                <h2 className="title">Registrar Producto</h2>

                <div className="input-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Ej: stops"
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Precio</label>
                    <input
                        type="number"
                        name="precio"
                        value={form.precio}
                        onChange={handleChange}
                        placeholder="Ej: 250000"
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Cantidad</label>
                    <input
                        type="number"
                        name="cantidad"
                        value={form.cantidad}
                        onChange={handleChange}
                        placeholder="Ej: 10"
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Imagen</label>
                    <input
                        type="file"
                        name="imagen"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn-primary">
                    Guardar Producto
                </button>
            </form>
        </div>
    );
}
