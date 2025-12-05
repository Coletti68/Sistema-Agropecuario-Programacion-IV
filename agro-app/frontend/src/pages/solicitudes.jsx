import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getSolicitudesPorUsuario } from '../services/api';
import '../styles/solicitudes.css'; 

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    try {
      const token = localStorage.getItem('token');
      const usuarioStr = localStorage.getItem("usuario");

      if (!token || !usuarioStr) {
        navigate('/login');
        return;
      }

      const usuario = JSON.parse(usuarioStr);
      const usuarioId = usuario.id || usuario.usuarioId || usuario.usuario_id || usuario.usuarioid;

      if (!usuarioId) {
        Swal.fire("Error", "No se pudo identificar al usuario.", "error");
        return;
      }

      const data = await getSolicitudesPorUsuario(token, usuarioId);
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setSolicitudes(data);
      } else if (data && Array.isArray(data.data)) {
        setSolicitudes(data.data);
      } else {
        setSolicitudes([]);
      }

    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
      Swal.fire('Error', 'No se pudieron cargar las solicitudes.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const verDetalle = (id) => {
    navigate(`/solicitudes/${id}`);
  };

  if (loading) {
    return (
      <div className="sol-loading-container">
        <div className="sol-spinner"></div>
        <p>Cargando solicitudes...</p>
      </div>
    );
  }

  return (
    <div className="sol-page-container">
      <header className="sol-header">
        <h1>Mis Solicitudes</h1>
        <p>Historial de tus pedidos de insumos</p>
      </header>

      <div className="sol-content">
        {solicitudes.length === 0 ? (
          <div className="sol-empty-state">
            <p>No tienes solicitudes registradas.</p>
            <button onClick={() => navigate('/solicitud/nueva')} className="sol-new-btn">
              Crear Nueva Solicitud
            </button>
          </div>
        ) : (
          <div className="sol-table-container">
            <table className="sol-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((solicitud) => (
                  <tr key={solicitud.id || solicitud.solicitudid}>
                    <td>#{solicitud.id || solicitud.solicitudid}</td>
                    <td>{new Date(solicitud.fecha || solicitud.fechasolicitud).toLocaleDateString()}</td>
                    <td>
                      <span className={`sol-status status-${(solicitud.estado || 'pendiente').toLowerCase()}`}>
                        {solicitud.estado || 'Pendiente'}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => verDetalle(solicitud.id || solicitud.solicitudid)}
                        className="sol-detail-btn"
                      >
                        Ver Detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
