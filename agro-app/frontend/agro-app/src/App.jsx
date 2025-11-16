import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import Productores from './pages/productores';
import NuevaSolicitud from './pages/nuevaSolicitud';
import Cultivos from './pages/cultivos';
import MapaLotes from './pages/mapaLotes';
import Perfil from './pages/Perfil';
import Logout from './pages/logout';
import Navbar from './components/navbar';

function App() {
  const isAuth = !!localStorage.getItem('token');

  return (
    <Router>
      {isAuth && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productores" element={<Productores />} />
        <Route path="/solicitud/nueva" element={<NuevaSolicitud />} />
        <Route path="/cultivos" element={<Cultivos />} />
        <Route path="/mapa" element={<MapaLotes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;