import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getSolicitudPorId } from '../services/api';
import '../styles/detalleSolicitud.css'; 

export default function DetalleSolicitud() {
    const { id } = useParams();
    const [solicitud, setSolicitud] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        cargarDetalle();
    }, [id]);

    const cargarDetalle = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const data = await getSolicitudPorId(token, id);
            setSolicitud(data);
        } catch (error) {
            console.error("Error al cargar detalle:", error);
            Swal.fire('Error', 'No se pudo cargar el detalle de la solicitud.', 'error');
            navigate('/solicitudes');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="det-loading-container">
                <div className="det-spinner"></div>
                <p>Cargando detalle...</p>
            </div>
        );
    }

    if (!solicitud) return null;

    const detalles = solicitud.detalles || solicitud.Detalles || [];
    const fecha = new Date(solicitud.fecha || solicitud.fechasolicitud).toLocaleDateString();
    const estado = solicitud.estado || 'Pendiente';
    const total = detalles.reduce((acc, item) => acc + (item.cantidad * item.preciounitario), 0);

    return (
        <div className="det-page-container">
            <div className="det-card">
                <header className="det-header">
                    <button onClick={() => navigate('/solicitudes')} className="det-back-btn">
                        ← Volver
                    </button>
                    <h1>Detalle de Solicitud #{id}</h1>
                    <span className={`det-status status-${estado.toLowerCase()}`}>{estado}</span>
                </header>

                <div className="det-info-grid">
                    <div className="det-info-item">
                        <label>Fecha de Solicitud</label>
                        <p>{fecha}</p>
                    </div>
                    <div className="det-info-item">
                        <label>Usuario</label>
                        <p>{solicitud.usuario?.nombre || 'Usuario Actual'}</p>
                    </div>
                </div>

                <div className="det-items-section">
                    <h2>Items Solicitados</h2>
                    <div className="det-table-container">
                        <table className="det-table">
                            <thead>
                                <tr>
                                    <th>Insumo</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detalles.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.insumo?.nombre || item.nombreInsumo || 'Insumo #' + item.insumoid}</td>
                                        <td>{item.cantidad}</td>
                                        <td>${item.preciounitario}</td>
                                        <td>${(item.cantidad * item.preciounitario).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="3" className="det-total-label">Total</td>
                                    <td className="det-total-amount">${total.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}