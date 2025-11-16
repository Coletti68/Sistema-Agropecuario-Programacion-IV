import { useEffect, useState } from 'react';
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
      alert('Solicitud enviada');
      setDetalle([]);
    } else {
      alert('Error al enviar');
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