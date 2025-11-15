// src/pages/Logout.jsx
import { useEffect } from 'react';

export default function Logout() {
  useEffect(() => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }, []);

  return <p>Cerrando sesión...</p>;
}