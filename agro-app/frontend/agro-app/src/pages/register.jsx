import { useState } from 'react';
import '../styles/register.css';

export default function Register() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    dni: '',
    direccion: '',
    password: '',
    rolid: 2, // por defecto 'productor'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.usuarioid) {
      alert('Registro exitoso');
      window.location.href = '/';
    } else {
      alert('Error al registrar');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro de usuario</h2>
        <input name="nombre" type="text" placeholder="Nombre completo" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} required />
        <input name="telefono" type="text" placeholder="Teléfono" onChange={handleChange} />
        <input name="dni" type="text" placeholder="DNI" onChange={handleChange} />
        <input name="direccion" type="text" placeholder="Dirección" onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}