import React, { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un email válido");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await response.json();

      localStorage.setItem("token", data.token);

      await Swal.fire({
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente',
        icon: 'success',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#2e7d32',
        timer: 2000,
        timerProgressBar: true
      });

      navigate("/dashboard");
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg">
        <div className="bg-img"></div>
      </div>

      <div className="login-content">
        <div className="login-header">
          <div className="logo-circle">🌿</div>
          <h1 className="title">Productores de Goya</h1>
          <p className="subtitle">Portal de Productores Agropecuarios</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Iniciar Sesión</h2>
            <p>Ingresa tus credenciales para acceder al sistema</p>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} className="form">
              {error && (
                <div className="alert">
                  <span>{error}</span>
                </div>
              )}

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-login">
                Iniciar Sesión
              </button>

              <p className="register-text">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  className="btn-link"
                  onClick={() => navigate("/register")}
                >
                  Regístrate aquí
                </button>
              </p>
            </form>
          </div>
        </div>

        <p className="footer">
          © 2025 Entidad de Productores Agropecuarios de Goya
        </p>
      </div>
    </div>
  );
}