import { useEffect, useState } from 'react';
import '../styles/cultivos.css';

export default function Cultivos() {
  const [cultivos, setCultivos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/mis-cultivos', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => setCultivos(data))
      .catch(err => console.error('Error al cargar cultivos', err));
  }, []);

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
              <td>{c.nombre}</td>
              <td>{c.fechasiembra}</td>
              <td>{c.latitud}</td>
              <td>{c.longitud}</td>
              <td>
                <button onClick={() => window.location.href = `/cultivo/${c.usuariocultivoid}/historial`}>
                  Ver historial
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
