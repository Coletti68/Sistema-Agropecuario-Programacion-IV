
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getInsumos, crearSolicitud } from '../services/api';
import '../styles/nuevasolicitud.css';

export default function NuevaSolicitud() {
  const [insumos, setInsumos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    cargarInsumos();
  }, []);

  const cargarInsumos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const data = await getInsumos(token);
      setInsumos(data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron cargar los insumos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const agregarAlCarrito = (insumo) => {
    const existente = carrito.find(item => item.insumoid === insumo.insumoid);

    if (existente) {
      const nuevoCarrito = carrito.map(item =>
        item.insumoid === insumo.insumoid
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, { ...insumo, cantidad: 1 }]);
    }
  };

  const actualizarCantidad = (insumoid, delta) => {
    const nuevoCarrito = carrito.map(item => {
      if (item.insumoid === insumoid) {
        const nuevaCantidad = Math.max(0, item.cantidad + delta);
        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    }).filter(item => item.cantidad > 0);

    setCarrito(nuevoCarrito);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const enviarSolicitud = async () => {
    if (carrito.length === 0) return;

    try {
      const token = localStorage.getItem('token');
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      console.log("Usuario en localStorage:", usuario); // Debugging log


      if (!usuario) {
        Swal.fire("Error", "No se encontró el usuario en la sesión", "error");
        return;
      }

      const detalle = carrito.map(item => ({
        insumoid: item.insumoid,
        cantidad: item.cantidad,
        preciounitario: item.precio
      }));

      // Intentar obtener el ID con diferentes nombres de propiedad comunes
      const usuarioId = usuario.id || usuario.usuarioId || usuario.usuario_id || usuario.usuarioid;

      if (!usuarioId) {
        console.error("No se encontró el ID del usuario en el objeto:", usuario);
        Swal.fire("Error", "No se pudo identificar al usuario. Por favor, inicia sesión nuevamente.", "error");
        return;
      }

      const data = await crearSolicitud(token, usuarioId, { detalle });

      if (data) {
        await Swal.fire({
          title: '¡Solicitud Enviada!',
          text: 'Tu pedido ha sido registrado exitosamente.',
          icon: 'success',
          confirmButtonColor: '#16a34a',
          timer: 2000
        });
        setCarrito([]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: error.message || 'Hubo un problema al procesar tu solicitud.',
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    }
  };


  const insumosFiltrados = insumos.filter(insumo =>
    insumo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="solicitud-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loading-spinner">Cargando catálogo...</div>
      </div>
    );
  }

  return (
    <div className="solicitud-container">
      {/* Catálogo de Productos */}
      <div className="catalog-section">
        <div className="catalog-header">
          <div>
            <h1>Catálogo de Insumos</h1>
            <p>Selecciona los productos que necesitas para tu producción</p>
          </div>
          <div className="search-container" style={{ marginTop: '1rem' }}>
            <input
              type="text"
              placeholder="Buscar insumo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                width: '100%',
                maxWidth: '400px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
          </div>
        </div>

        <div className="insumos-grid">
          {insumosFiltrados.map(insumo => (
            <div key={insumo.insumoid} className="insumo-card">
              <div className="card-header">
                <div>
                  <h3 className="insumo-name">{insumo.nombre}</h3>
                  <span className={`stock - badge ${insumo.stock < 10 ? 'low' : ''} `}>
                    {insumo.stock} disponibles
                  </span>
                </div>
                <span className="insumo-price">${insumo.precio}</span>
              </div>

              <p className="insumo-desc">{insumo.descripcion || 'Sin descripción disponible'}</p>

              <button
                className="add-btn"
                onClick={() => agregarAlCarrito(insumo)}
                disabled={insumo.stock === 0}
              >
                {insumo.stock === 0 ? 'Sin Stock' : 'Agregar al Pedido'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Carrito Lateral */}
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Tu Pedido</h2>
          <span className="cart-count">{carrito.length} items</span>
        </div>

        <div className="cart-items">
          {carrito.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío</p>
          ) : (
            carrito.map(item => (
              <div key={item.insumoid} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.nombre}</span>
                  <span className="item-price">${item.precio} x {item.cantidad}</span>
                </div>
                <div className="item-controls">
                  <button
                    className="qty-btn"
                    onClick={() => actualizarCantidad(item.insumoid, -1)}
                  >
                    -
                  </button>
                  <span className="item-qty">{item.cantidad}</span>
                  <button
                    className="qty-btn"
                    onClick={() => actualizarCantidad(item.insumoid, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <div className="total-row">
            <span className="total-label">Total Estimado</span>
            <span className="total-amount">${calcularTotal().toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={enviarSolicitud}
            disabled={carrito.length === 0}
          >
            Confirmar Solicitud
          </button>
        </div>
      </div>
    </div>
  );
}
