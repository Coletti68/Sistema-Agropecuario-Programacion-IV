import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Productores from "./pages/productores";
import NuevaSolicitud from "./pages/nuevasolicitud";
import Cultivos from "./pages/cultivos";
import MapaLotes from "./pages/mapalotes";
import Perfil from "./pages/perfil";
import Logout from "./pages/logout";
import Navbar from "./components/navbar";

console.log("App.jsx loaded");

function App() {
  console.log("App component rendering");

  const handleRegister = async (userData) => {
    try {
      console.log("Enviando registro...", userData);

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        alert(errorData?.message || "Error al registrarse");
        return;
      }

      alert("Cuenta creada exitosamente. Ahora inicia sesión.");
      window.location.href = "/";
    } catch (err) {
      console.error("Error al registrar:", err);
      alert("No se pudo conectar con la API.");
    }
  };

  return (
    <Router>
      <Routes>
        {/* Rutas públicas sin Navbar */}
        <Route path="/" element={<Login />} />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />

        {/* Rutas privadas con Navbar */}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/productores"
          element={
            <>
              <Navbar />
              <Productores />
            </>
          }
        />
        <Route
          path="/solicitud/nueva"
          element={
            <>
              <Navbar />
              <NuevaSolicitud />
            </>
          }
        />
        <Route
          path="/cultivos"
          element={
            <>
              <Navbar />
              <Cultivos />
            </>
          }
        />
        <Route
          path="/mapa"
          element={
            <>
              <Navbar />
              <MapaLotes />
            </>
          }
        />
        <Route
          path="/perfil"
          element={
            <>
              <Navbar />
              <Perfil />
            </>
          }
        />
        <Route
          path="/logout"
          element={
            <>
              <Navbar />
              <Logout />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;