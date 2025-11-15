import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import './MapaLotes.css';

export default function MapaLotes() {
  const [cultivos, setCultivos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/mis-cultivos', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => setCultivos(data));
  }, []);

  const icono = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    iconSize: [32, 32],
  });

  return (
    <div className="mapa-container">
      <h1>Mapa de lotes</h1>
      <MapContainer center={[-29.145, -59.265]} zoom={10} scrollWheelZoom={true} style={{ height: '500px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {cultivos.map(c => (
          <Marker key={c.usuariocultivoid} position={[c.latitud, c.longitud]} icon={icono}>
            <Popup>
              <strong>{c.nombre}</strong><br />
              Siembra: {c.fechasiembra}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}