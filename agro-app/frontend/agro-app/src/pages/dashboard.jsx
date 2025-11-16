import '../styles/dashboard.css';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    cultivosActivos: 0,
    solicitudesPendientes: 0,
    pagosRecientes: 0,
    insumosBajoStock: 0,
  });

  useEffect(() => {
  setStats({
    cultivosActivos: 12,
    solicitudesPendientes: 5,
    pagosRecientes: 3,
    insumosBajoStock: 4,
  });
}, []);


  return (
    <div className="dashboard-container">
      <h1>Panel de control</h1>
      <div className="dashboard-grid">
        <div className="card">
          <h2>{stats.cultivosActivos}</h2>
          <p>Cultivos activos</p>
        </div>
        <div className="card">
          <h2>{stats.solicitudesPendientes}</h2>
          <p>Solicitudes pendientes</p>
        </div>
        <div className="card">
          <h2>{stats.pagosRecientes}</h2>
          <p>Pagos recientes</p>
        </div>
        <div className="card">
          <h2>{stats.insumosBajoStock}</h2>
          <p>Insumos bajo stock</p>
        </div>
      </div>
    </div>
  );
}