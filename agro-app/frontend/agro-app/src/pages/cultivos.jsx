import { useEffect, useState } from 'react';
import '../styles/cultivos.css';
import { getCultivos, crearCultivo } from '../services/api';
import Swal from 'sweetalert2';

export default function Cultivos() {
  const [cultivos, setCultivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nuevoCultivo, setNuevoCultivo] = useState({
    nombre: '',
    descripcion: '',
    latitud: '',
    longitud: '',
    fechasiembra: '',
    observaciones: ''
  });

  const fetchCultivos = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const data = await getCultivos(token);
      console.log('Cultivos fetched:', data);
      setCultivos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCultivos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoCultivo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await crearCultivo(token, nuevoCultivo);

      // Refresh list immediately
      await fetchCultivos();

      // Reset form
      setNuevoCultivo({
        nombre: '',
        descripcion: '',
        latitud: '',
        longitud: '',
        fechasiembra: '',
        observaciones: ''
      });

      Swal.fire({
        icon: 'success',
        title: '¡Cultivo Agregado!',
        text: 'El cultivo y su historial inicial se han guardado correctamente.',
        confirmButtonColor: '#4CAF50',
        timer: 3000
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agregar el cultivo: ' + err.message,
        confirmButtonColor: '#d33'
      });
    }
  };

  if (loading) return <p>Cargando cultivos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="cultivos-container">
      <h1>Mis cultivos</h1>

      <div className="add-cultivo-section">
        <h2>Agregar Nuevo Cultivo</h2>
        <form className="cultivo-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Cultivo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nuevoCultivo.nombre}
              onChange={handleInputChange}
              required
              placeholder="Ej: Maíz, Soja..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="fechasiembra">Fecha de Siembra</label>
            <input
              type="date"
              id="fechasiembra"
              name="fechasiembra"
              value={nuevoCultivo.fechasiembra}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="latitud">Latitud</label>
            <input
              type="number"
              step="any"
              id="latitud"
              name="latitud"
              value={nuevoCultivo.latitud}
              onChange={handleInputChange}
              placeholder="-34.6037"
            />
          </div>

          <div className="form-group">
            <label htmlFor="longitud">Longitud</label>
            <input
              type="number"
              step="any"
              id="longitud"
              name="longitud"
              value={nuevoCultivo.longitud}
              onChange={handleInputChange}
              placeholder="-58.3816"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={nuevoCultivo.descripcion}
              onChange={handleInputChange}
              rows="2"
              placeholder="Detalles adicionales del cultivo..."
            ></textarea>
          </div>

          <div className="form-group full-width">
            <label htmlFor="observaciones">Observaciones Iniciales (Historial)</label>
            <textarea
              id="observaciones"
              name="observaciones"
              value={nuevoCultivo.observaciones}
              onChange={handleInputChange}
              rows="2"
              placeholder="Estado inicial del cultivo, condiciones, etc..."
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">Agregar Cultivo</button>
          </div>
        </form>
      </div>

      <br />
      <h1>Lista de cultivos</h1>
      <table className="cultivos-table">
        <thead>
          <tr>
            <th>Cultivo</th>
            <th>Fecha de siembra</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>Historial</th>
          </tr>
        </thead>
        <tbody>
          {cultivos.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                No tienes cultivos registrados. ¡Agrega uno nuevo arriba!
              </td>
            </tr>
          ) : (
            cultivos.map((c, index) => (
              <tr key={c.usuariocultivoid || c.id || index}>
                <td>{c.Cultivo?.nombre || c.cultivo?.nombre || c.nombre || '—'}</td>
                <td>{c.fechasiembra ? new Date(c.fechasiembra).toLocaleDateString() : '—'}</td>
                <td>{c.latitud || '—'}</td>
                <td>{c.longitud || '—'}</td>
                <td>
                  {c.HistorialCultivos?.length
                    ? <ul>{c.HistorialCultivos.map(h => (
                      <li key={h.historialid}>{new Date(h.fecha).toLocaleDateString()}: {h.observaciones}</li>
                    ))}</ul>
                    : <span>No hay historial</span>}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
