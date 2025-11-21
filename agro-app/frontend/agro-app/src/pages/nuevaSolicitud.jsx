import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/nuevaSolicitud.css';

export default function NuevaSolicitud() {
  const [insumos, setInsumos] = useState([]);
  const [detalle, setDetalle] = useState([]);
  const [usuarioid, setUsuarioid] = useState(null); // lo podés obtener del token

  useEffect(() => {
    fetch('http://localhost:3000/api/insumos')
      .then(res => res.json())
      .then(data => setInsumos(data));
  }, []);

  const agregarInsumo = (insumoid) => {
    const existente = detalle.find(d => d.insumoid === insumoid);
    if (!existente) {
      const insumo = insumos.find(i => i.insumoid === insumoid);
      setDetalle([...detalle, { insumoid, nombre: insumo.nombre, cantidad: 1, preciounitario: insumo.precio }]);
    }
  };

  const actualizarCantidad = (index, cantidad) => {
    const nuevoDetalle = [...detalle];
    nuevoDetalle[index].cantidad = cantidad;
    setDetalle(nuevoDetalle);
  };

  const enviarSolicitud = async () => {
    const res = await fetch('http://localhost:3000/api/solicitudes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuarioid, detalle }),
    });
    const data = await res.json();

    if (data.solicitudid) {
      await Swal.fire({
        title: '¡Solicitud enviada!',
        text: 'Tu solicitud de insumos ha sido registrada.',
        icon: 'success',
        confirmButtonColor: '#2e7d32'
      });
      setDetalle([]);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar la solicitud.',
        icon: 'error',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div className="solicitud-container">
      <h1>Nueva solicitud de insumos</h1>
      <div className="insumos-list">
        {insumos.map(i => (
          <button key={i.insumoid} onClick={() => agregarInsumo(i.insumoid)}>
            {i.nombre} (${i.precio})
          </button>
        ))}
      </div>

      <div className="detalle-list">
        <h2>Detalle de solicitud</h2>
        {detalle.map((d, index) => (
          <div key={d.insumoid} className="detalle-item">
            <span>{d.nombre}</span>
            <input
              type="number"
              value={d.cantidad}
              min="1"
              onChange={(e) => actualizarCantidad(index, parseInt(e.target.value))}
            />
            <span>${d.preciounitario}</span>
          </div>
        ))}
        {detalle.length > 0 && (
          <button className="enviar-btn" onClick={enviarSolicitud}>Enviar solicitud</button>
        )}
      </div>
    </div>
  );
}