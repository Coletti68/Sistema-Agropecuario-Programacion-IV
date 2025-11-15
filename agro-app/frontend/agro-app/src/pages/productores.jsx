import { useEffect, useState } from 'react';
import './Productores.css';

export default function Productores() {
  const [productores, setProductores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/productores')
      .then(res => res.json())
      .then(data => setProductores(data))
      .catch(err => console.error('Error al cargar productores', err));
  }, []);

  return (
    <div className="productores-container">
      <h1>Gestión de Productores</h1>
      <table className="productores-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>DNI</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {productores.map(p => (
            <tr key={p.usuarioid}>
              <td>{p.nombre}</td>
              <td>{p.email}</td>
              <td>{p.telefono}</td>
              <td>{p.dni}</td>
              <td>{p.activo ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}