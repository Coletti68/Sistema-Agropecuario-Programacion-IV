import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getInsumos, crearSolicitud } from '../services/api';
import '../styles/nuevaSolicitud.css';

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

      console.log("Iniciando carga de insumos...");
      const data = await getInsumos(token);
      console.log("Data received in component:", data);

      if (Array.isArray(data)) {
        setInsumos(data);
      } else if (data && Array.isArray(data.data)) {
        setInsumos(data.data);
      } else if (data && Array.isArray(data.insumos)) {
        setInsumos(data.insumos);
      } else {
        console.error("Formato de insumos inesperado:", data);
        setInsumos([]);
        Swal.fire('Error', 'El formato de los datos recibidos no es válido', 'error');
      }
    } catch (error) {
      console.error("Error en cargarInsumos:", error);
      Swal.fire('Error', 'No se pudieron cargar los insumos. Revisa la consola.', 'error');
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
    const nuevoCarrito = carrito
      .map(item => {
        if (item.insumoid === insumoid) {
          const nuevaCantidad = Math.max(0, item.cantidad + delta);
          return { ...item, cantidad: nuevaCantidad };
        }
        return item;
      })
      .filter(item => item.cantidad > 0);

    setCarrito(nuevoCarrito);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const enviarSolicitud = async () => {
    if (carrito.length === 0) {
      Swal.fire('Atención', 'El carrito está vacío', 'warning');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const usuarioStr = localStorage.getItem("usuario");

      if (!usuarioStr) {
        Swal.fire("Error", "No se encontró el usuario en la sesión", "error");
        return;
      }

      const usuario = JSON.parse(usuarioStr);

      const detalle = carrito.map(item => ({
        insumoid: item.insumoid,
        cantidad: item.cantidad,
        preciounitario: item.precio
      }));

      const usuarioId =
        usuario.id ||
        usuario.usuarioId ||
        usuario.usuario_id ||
        usuario.usuarioid;

      if (!usuarioId) {
        Swal.fire("Error", "No se pudo identificar al usuario. Por favor inicie sesión nuevamente.", "error");
        return;
      }

      const payload = {
        usuarioid: usuarioId,
        detalle
      };

      const response = await crearSolicitud(token, payload);

      if (response) {
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
      console.error("Error al enviar solicitud:", error);
      Swal.fire({
        title: 'Error',
        text: error.message || 'Hubo un problema al procesar la solicitud.',
        icon: 'error'
      });
    }
  };

  const insumosFiltrados = insumos.filter(insumo =>
    insumo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="ns-loading-container">
        <div className="ns-spinner"></div>
        <p>Cargando catálogo...</p>
      </div>
    );
  }

  return (
    <div className="ns-page-container">
      <header className="ns-header">
        <h1>Nueva Solicitud de Insumos</h1>
        <p>Selecciona los productos necesarios para tu producción</p>
      </header>

      <div className="ns-content-grid">
        {/* Columna de Insumos */}
        <div className="ns-catalog-section">
          <div className="ns-search-bar">
            <input
              type="text"
              placeholder="🔍 Buscar insumos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="ns-products-grid">
            {insumosFiltrados.length > 0 ? (
              insumosFiltrados.map((insumo) => (
                <div key={insumo.insumoid || insumo.id} className="ns-product-card">
                  <div className="ns-card-header">
                    <h3>{insumo.nombre}</h3>
                    <span className="ns-price-tag">${insumo.precio}</span>
                  </div>
                  <p className="ns-description">{insumo.descripcion}</p>
                  <button
                    onClick={() => agregarAlCarrito(insumo)}
                    className="ns-add-btn"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              ))
            ) : (
              <div className="ns-empty-state">
                <p>No se encontraron insumos.</p>
              </div>
            )}
          </div>
        </div>

        {/* Columna del Carrito */}
        <div className="ns-cart-section">
          <div className="ns-cart-container">
            <div className="ns-cart-header">
              <h2>Tu Pedido</h2>
              <span className="ns-item-count">{carrito.length} items</span>
            </div>

            {carrito.length === 0 ? (
              <div className="ns-cart-empty">
                <p>El carrito está vacío</p>
                <small>Agrega productos del catálogo</small>
              </div>
            ) : (
              <>
                <div className="ns-cart-items">
                  {carrito.map((item) => (
                    <div key={item.insumoid} className="ns-cart-item">
                      <div className="ns-item-info">
                        <h4>{item.nombre}</h4>
                        <span className="ns-item-price">${item.precio} x {item.cantidad}</span>
                      </div>
                      <div className="ns-item-controls">
                        <button onClick={() => actualizarCantidad(item.insumoid, -1)}>-</button>
                        <span>{item.cantidad}</span>
                        <button onClick={() => actualizarCantidad(item.insumoid, 1)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ns-cart-footer">
                  <div className="ns-total-row">
                    <span>Total Estimado</span>
                    <span className="ns-total-amount">${calcularTotal().toFixed(2)}</span>
                  </div>

                  <button onClick={enviarSolicitud} className="ns-checkout-btn">
                    Confirmar Solicitud
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
