import { Link } from 'react-router-dom';
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>AgroSistema</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/solicitud/nueva">Nueva solicitud</Link></li>
        <li><Link to="/cultivos">Mis cultivos</Link></li>
        <li><Link to="/mapa">Mapa de lotes</Link></li>
        <li><Link to="/perfil">Mi información</Link></li>
        <li><Link to="/logout">Cerrar sesión</Link></li>
      </ul>
    </nav>
  );
}