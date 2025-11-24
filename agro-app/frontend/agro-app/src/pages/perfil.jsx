
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getPerfil, updatePerfil } from '../services/api';
import '../styles/perfil.css';

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const [editando, setEditando] = useState(false);
  const [perfilOriginal, setPerfilOriginal] = useState(null); // Para cancelar cambios
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    cargarPerfil(token);
  }, [navigate]);

  const cargarPerfil = (token) => {
    getPerfil(token)
      .then(data => {
        setPerfil(data);
        setPerfilOriginal(data);
      })
      .catch(err => {
        console.error('Error al cargar perfil', err);
        if (err.message.includes('401') || err.message.includes('Unauthorized')) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cargar la información del perfil',
          icon: 'error',
          confirmButtonColor: '#d33'
        });
      });
  };

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const handleCancelar = () => {
    setPerfil(perfilOriginal);
    setEditando(false);
  };

  const handleGuardar = async () => {
    // Validar campos vacíos
    if (!perfil.nombre || !perfil.telefono || !perfil.dni || !perfil.direccion) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de guardar.',
        icon: 'warning',
        confirmButtonColor: '#ffa000'
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const data = await updatePerfil(token, perfil);

      if (data) {
        await Swal.fire({
          title: '¡Perfil actualizado!',
          text: 'Tus datos han sido guardados correctamente.',
          icon: 'success',
          confirmButtonColor: '#16a34a',
          timer: 2000
        });
        setPerfilOriginal(perfil);
        setEditando(false);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron guardar los cambios.',
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    }
  };

  if (!perfil) {
    return (
      <div className="perfil-container" style={{ justifyContent: 'center' }}>
        <div className="loading-spinner">Cargando información...</div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <h1>Mi Información</h1>
      <div className="perfil-form">
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Nombre Completo</label>
            <input
              name="nombre"
              value={perfil.nombre || ''}
              onChange={handleChange}
              disabled={!editando}
              autoComplete="off"
              placeholder="Ingresa tu nombre completo"
            />
          </div>

          <div className="form-group full-width">
            <label>Correo Electrónico</label>
            <input
              name="email"
              value={perfil.email || ''}
              disabled
              className="input-readonly"
            />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input
              name="telefono"
              value={perfil.telefono || ''}
              onChange={handleChange}
              disabled={!editando}
              autoComplete="off"
              placeholder="Ej: 381..."
            />
          </div>

          <div className="form-group">
            <label>DNI</label>
            <input
              name="dni"
              value={perfil.dni || ''}
              onChange={handleChange}
              disabled={!editando}
              autoComplete="off"
              placeholder="Tu número de documento"
            />
          </div>

          <div className="form-group full-width">
            <label>Dirección</label>
            <input
              name="direccion"
              value={perfil.direccion || ''}
              onChange={handleChange}
              disabled={!editando}
              autoComplete="off"
              placeholder="Tu dirección completa"
            />
          </div>
        </div>

        <div className="perfil-actions">
          {editando ? (
            <>
              <button className="btn-cancel" onClick={handleCancelar}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleGuardar}>
                Guardar Cambios
              </button>
            </>
          ) : (
            <button className="btn-edit" onClick={() => setEditando(true)}>
              Editar Información
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
