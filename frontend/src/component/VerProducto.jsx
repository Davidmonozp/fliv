import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../styles/VerProducto.css";
import logoFliv from "../assets/logo-fliv.jpg";


export default function VerProducto() {
    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        cantidad: ""
    });

    const [editando, setEditando] = useState(false);
    const [loading, setLoading] = useState(true);

    // 🔹 Cargar producto
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const resp = await axios.get(
                    `http://127.0.0.1:8000/api/ver-productos/${id}`
                );

                setProducto(resp.data);
                setForm({
                    nombre: resp.data.nombre,
                    precio: resp.data.precio,
                    cantidad: resp.data.cantidad
                });
            } catch (error) {
                console.log(error)
                Swal.fire("Error", "Producto no encontrado", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    // 🔹 Cambios del formulario
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // 🔹 Guardar cambios
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://127.0.0.1:8000/api/editar-productos/${id}`,
                form
            );

            Swal.fire("Actualizado", "Producto actualizado correctamente", "success");

            setProducto({ ...producto, ...form });
            setEditando(false);
        } catch (error) {
            console.log(error)
            Swal.fire("Error", "No se pudo actualizar el producto", "error");
        }
    };

    if (loading) return <p>Cargando producto...</p>;
    if (!producto) return null;

    return (

        <div className="producto-detail-container">
            <img className="logo-fliv" src={logoFliv} alt="fliv" />
            <Link to="/productos" className="btn-back">
                ← Volver
            </Link>

            <div className="producto-card">
                {producto.imagen && (
                    <img
                        src={`http://127.0.0.1:8000/storage/${producto.imagen}`}
                        alt={producto.nombre}
                        className="producto-image"
                    />
                )}

                {!editando ? (
                    /* ===== MODO VER ===== */
                    <div className="producto-info">
                        <h2>{producto.nombre}</h2>
                        <p><strong>Precio:</strong> ${producto.precio}</p>
                        <p><strong>Cantidad:</strong> {producto.cantidad}</p>

                        <button
                            className="btn-edit"
                            onClick={() => setEditando(true)}
                        >
                            ✏️ Editar Producto
                        </button>
                    </div>
                ) : (
                    /* ===== MODO EDITAR ===== */
                    <form className="producto-info" onSubmit={handleUpdate}>
                        <h2>Editar Producto</h2>

                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="precio"
                            value={form.precio}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="cantidad"
                            value={form.cantidad}
                            onChange={handleChange}
                            required
                        />

                        <div className="edit-buttons">
                            <button type="submit" className="btn-save">
                                Guardar
                            </button>

                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => setEditando(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}






// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import "../styles/VerProducto.css";

// export default function VerProducto() {
//     const { id } = useParams();
//     const [producto, setProducto] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProducto = async () => {
//             try {
//                 const resp = await axios.get(
//                     `http://127.0.0.1:8000/api/ver-productos/${id}`
//                 );
//                 setProducto(resp.data);
//             } catch (error) {
//                 console.log(error);
//                 Swal.fire("Error", "Producto no encontrado", "error");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducto();
//     }, [id]);

//     if (loading) return <p>Cargando producto...</p>;
//     if (!producto) return null;

//     return (
//         <div className="producto-detail-container">
//             <Link to="/productos" className="btn-back">
//                 ← Volver
//             </Link>

//             <div className="producto-card">
//                 {producto.imagen && (
//                     <img
//                         src={`http://127.0.0.1:8000/storage/${producto.imagen}`}
//                         alt={producto.nombre}
//                         className="producto-image"
//                     />
//                 )}

//                 <div className="producto-info">
//                     <h2>{producto.nombre}</h2>
//                     <p><strong>Precio:</strong> ${producto.precio}</p>
//                     <p><strong>Cantidad:</strong> {producto.cantidad}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }
