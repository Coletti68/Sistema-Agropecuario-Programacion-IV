import { useEffect, useState } from 'react';
import '../styles/cultivos.css';
import { getCultivos, crearCultivo } from '../services/api';
import Swal from 'sweetalert2';
import { useRef } from 'react';

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
    console.log('🚀 Data cruda de la API:', data);

    const asignaciones = Array.isArray(data) ? data : data.cultivos || [];

    const cultivosUnicos = new Map();

    for (const c of asignaciones) {
      const key = c.cultivoid || c.Cultivo?.id;
      const existente = cultivosUnicos.get(key);

      const tieneUbicacion = c.latitud !== null && c.longitud !== null;

      if (!existente || (tieneUbicacion && (existente.latitud === '—' || existente.longitud === '—'))) {
        cultivosUnicos.set(key, {
          id: c.usuariocultivoid || c.id || Math.random(),
          nombre: c.Cultivo?.nombre || c.nombre || '—',
          descripcion: c.Cultivo?.descripcion || c.descripcion || '',
          latitud: tieneUbicacion ? c.latitud : '—',
          longitud: tieneUbicacion ? c.longitud : '—',
          fechasiembra:
            c.fechasiembra && !isNaN(new Date(c.fechasiembra))
              ? new Date(c.fechasiembra).toLocaleDateString('es-AR')
              : '—',
          historial: Array.isArray(c.HistorialCultivos) ? c.HistorialCultivos : []
        });
      }
    }

    const lista = Array.from(cultivosUnicos.values());
    console.log("✅ Cultivos procesados sin duplicados:", lista);

    setCultivos(lista);

  } catch (err) {
    console.error(err);
    setError(err.message || 'Error al cargar cultivos');
  } finally {
    setLoading(false);
  }
};


const fetchedRef = useRef(false);

useEffect(() => {
  if (fetchedRef.current) return;
  fetchedRef.current = true;
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
  
    const cultivoCreado = await crearCultivo(token, {
      nombre: nuevoCultivo.nombre,
      descripcion: nuevoCultivo.descripcion
    });

 
    const usuarioId = localStorage.getItem('usuarioid');
    const asignacion = {
      usuarioid: usuarioId ? parseInt(usuarioId) : null,
      cultivoid: cultivoCreado.cultivoid || cultivoCreado.id,
      latitud: nuevoCultivo.latitud !== '' ? parseFloat(nuevoCultivo.latitud) : null,
      longitud: nuevoCultivo.longitud !== '' ? parseFloat(nuevoCultivo.longitud) : null,
      fechasiembra: nuevoCultivo.fechasiembra 
        ? new Date(nuevoCultivo.fechasiembra).toISOString().split('T')[0] 
        : null,
      observaciones: nuevoCultivo.observaciones || null
    };

    console.log('Asignación enviada:', asignacion);

    await fetch('http://localhost:3000/api/usuariocultivo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(asignacion)
    });

    setNuevoCultivo({
      nombre: '',
      descripcion: '',
      latitud: '',
      longitud: '',
      fechasiembra: '',
      observaciones: ''
    });

    await fetchCultivos();

    Swal.fire({
      icon: 'success',
      title: '¡Cultivo Agregado!',
      text: 'El cultivo y su historial inicial se han guardado correctamente.',
      confirmButtonColor: '#4CAF50',
      timer: 2500
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo agregar el cultivo: ' + (err.message || 'Error desconocido'),
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
            />
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
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">Agregar Cultivo</button>
          </div>
        </form>
      </div>

      <h2>Lista de cultivos</h2>
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
            cultivos.map(c => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.fechasiembra}</td>
                <td>{c.latitud}</td>
                <td>{c.longitud}</td>
                <td>
                  {c.historial.length
                    ? <ul>{c.historial.map(h => (
                        <li key={h.historialid || Math.random()}>
                          {h.fecha ? new Date(h.fecha).toLocaleDateString() : ''}: {h.observaciones}
                        </li>
                      ))}</ul>
                    : <span>No hay historial</span>
                  }
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
