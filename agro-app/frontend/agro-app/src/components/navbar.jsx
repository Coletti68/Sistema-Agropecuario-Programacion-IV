
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../styles/navbar.css";
import {
  LayoutDashboard,
  PlusCircle,
  Sprout,
  Map,
  User,
  LogOut,
  Info
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleScrollToAbout = (e) => {
    e.preventDefault();
    if (location.pathname === '/dashboard') {
      document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/dashboard#nosotros');
    }
  };

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
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/solicitud/nueva" className={isActive('/solicitud/nueva')}>
              <PlusCircle size={18} />
              <span>Insumos & Agroquímicos</span>
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
              <span>Ubicacion de mis Lotes</span>
            </Link>
          </li>
          <li>
            <Link to="/perfil" className={isActive('/perfil')}>
              <User size={18} />
              <span>Perfil</span>
            </Link>
          </li>
          <li>
            <a href="#nosotros" onClick={handleScrollToAbout} className="nav-link">
              <Info size={18} />
              <span>Nosotros</span>
            </a>
          </li>
          <li>
            <Link to="/logout" className="logout-link">
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
