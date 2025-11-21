import { Link, useLocation } from 'react-router-dom';
import "../styles/navbar.css";
import {
  LayoutDashboard,
  PlusCircle,
  Sprout,
  Map,
  User,
  LogOut
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-logo">
          <span className="logo-icon">🌿</span> AgroSistema
        </h2>
        <ul className="navbar-links">
          <li>
            <Link to="/dashboard" className={isActive('/dashboard')}>
              <LayoutDashboard size={18} />
              <span>Catálogo</span>
            </Link>
          </li>
          <li>
            <Link to="/solicitud/nueva" className={isActive('/solicitud/nueva')}>
              <PlusCircle size={18} />
              <span>Nueva Solicitud</span>
            </Link>
          </li>
          <li>
            <Link to="/cultivos" className={isActive('/cultivos')}>
              <Sprout size={18} />
              <span>Mis Cultivos</span>
            </Link>
          </li>
          <li>
            <Link to="/mapa" className={isActive('/mapa')}>
              <Map size={18} />
              <span>Mapa</span>
            </Link>
          </li>
          <li>
            <Link to="/perfil" className={isActive('/perfil')}>
              <User size={18} />
              <span>Mi Perfil</span>
            </Link>
          </li>
          <li>
            <Link to="/logout" className="logout-link">
              <LogOut size={18} />
              <span>Salir</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}