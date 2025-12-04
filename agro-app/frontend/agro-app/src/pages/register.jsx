import { useState } from "react";
import * as api from "../services/api";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    dni: "",
    direccion: "",
    ubicacion: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones básicas
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.telefono ||
      !formData.dni ||
      !formData.direccion ||
      !formData.ubicacion ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Por favor ingresa un email válido");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const { confirmPassword, ...userData } = formData;

    try {
      const data = await api.register({ ...userData, rolid: 1 });

      await Swal.fire({
        title: '¡Cuenta creada!',
        text: 'Tu registro ha sido exitoso. Ahora puedes iniciar sesión.',
        icon: 'success',
        confirmButtonText: 'Ir al Login',
        confirmButtonColor: '#2e7d32'
      });

      console.log("Usuario creado:", data);
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Error de conexión con el servidor");
    }
  };

  return (
    <div className="page">
      <div className="backgroundImage"></div>

      <div className="container">
        <div className="header">
          <div className="logoCircle">🌿</div>
          <h1 className="title">Productores de Goya</h1>
          <p className="subtitle">Portal de Productores Agropecuarios</p>
        </div>

        <div className="card">
          <div className="cardHeader">
            <button className="backBtn" onClick={() => navigate("/")}>
              ←
            </button>
            <div>
              <h2 className="cardTitle">Crear Cuenta</h2>
              <p className="cardDesc">
                Registrate para acceder al portal de productores
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="form">
            {error && <div className="error">{error}</div>}

            <div className="grid">
              <div className="field">
                <label>Nombre Completo *</label>
                <input
                  type="text"
                  placeholder="Juan Pérez"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Email *</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Teléfono *</label>
                <input
                  type="tel"
                  placeholder="+54 9 3777 123456"
                  value={formData.telefono}
                  onChange={(e) =>
                    setFormData({ ...formData, telefono: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>DNI *</label>
                <input
                  type="text"
                  placeholder="12345678"
                  value={formData.dni}
                  onChange={(e) =>
                    setFormData({ ...formData, dni: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Dirección *</label>
                <input
                  type="text"
                  placeholder="Av. Libertad 1234"
                  value={formData.direccion}
                  onChange={(e) =>
                    setFormData({ ...formData, direccion: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Ubicación *</label>
                <input
                  type="text"
                  placeholder="Goya, Corrientes"
                  value={formData.ubicacion}
                  onChange={(e) =>
                    setFormData({ ...formData, ubicacion: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Contraseña *</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div className="field">
                <label>Confirmar Contraseña *</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button type="submit" className="submitBtn">
              Crear Cuenta
            </button>

            <div className="loginRedirect">
              ¿Ya tienes cuenta?{" "}
              <button type="button" onClick={() => navigate("/")}>
                Inicia sesión aquí
              </button>
            </div>
          </form>
        </div>

        <p className="footer">
          © 2025 Entidad de Productores Agropecuarios de Goya
        </p>
      </div>
    </div>
  );
}