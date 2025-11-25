import { useEffect, useState } from 'react';
import '../styles/cultivos.css';

export default function Cultivos() {
  const [cultivos, setCultivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:3000/api/cultivos', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async res => {
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Error ${res.status}: ${errText}`);
        }
        return res.json();
      })
      .then(data => setCultivos(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando cultivos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="cultivos-container">
      <h1>Mis cultivos</h1>
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
          {cultivos.map(c => (
            <tr key={c.usuariocultivoid}>
              <td>{c.Cultivo?.nombre || '—'}</td>
              <td>{c.fechasiembra || '—'}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
