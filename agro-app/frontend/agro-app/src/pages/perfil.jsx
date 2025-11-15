import { useEffect, useState } from 'react';
import './Perfil.css';

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/mi-perfil', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => setPerfil(data))
      .catch(err => console.error('Error al cargar perfil', err));
  }, []);

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleGuardar = async () => {
    const res = await fetch('http://localhost:3000/api/mi-perfil', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(perfil),
    });
    const data = await res.json();
    if (data.success) {
      alert('Perfil actualizado');
      setEditando(false);
    } else {
      alert('Error al guardar');
    }
  };

  if (!perfil) return <p>Cargando...</p>;

  return (
    <div className="perfil-container">
      <h1>Mi información</h1>
      <div className="perfil-form">
        <label>Nombre completo</label>
        <input
          name="nombre"
          value={perfil.nombre}
          onChange={handleChange}
          disabled={!editando}
        />
        <label>Correo electrónico</label>
        <input
          name="email"
          value={perfil.email}
          onChange={handleChange}
          disabled
        />
        <label>Teléfono</label>
        <input
          name="telefono"
          value={perfil.telefono || ''}
          onChange={handleChange}
          disabled={!editando}
        />
        <label>DNI</label>
        <input
          name="dni"
          value={perfil.dni || ''}
          onChange={handleChange}
          disabled={!editando}
        />
        <label>Dirección</label>
        <input
          name="direccion"
          value={perfil.direccion || ''}
          onChange={handleChange}
          disabled={!editando}
        />
        <div className="perfil-actions">
          {editando ? (
            <button onClick={handleGuardar}>Guardar</button>
          ) : (
            <button onClick={() => setEditando(true)}>Editar</button>
          )}
        </div>
      </div>
    </div>
  );
}