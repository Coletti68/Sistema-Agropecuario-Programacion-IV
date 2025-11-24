const API_URL = 'http://localhost:3000/api';

// =========================
//      CULTIVOS
// =========================
export const crearCultivo = async (data) => {
  const res = await fetch(`${API_URL}/cultivos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

// =========================
//      INSUMOS & SOLICITUDES
// =========================

export const getInsumos = async (token) => {
  const res = await fetch(`${API_URL}/insumos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Error al cargar insumos');
  }
  return res.json();
};

export const crearSolicitud = async (token, data) => {
  const res = await fetch(`${API_URL}/solicitudes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Error al crear solicitud" }));
    console.error("Error creating request:", errorData);
    throw new Error(errorData.message || errorData.error || "Error al crear solicitud");
  }

  return res.json();
};



// =========================
//      PERFIL
// =========================

export const getPerfil = async (token) => {
  const res = await fetch(`${API_URL}/auth/mi-perfil`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Error al cargar perfil' }));
    throw new Error(error.message || 'Error al cargar perfil');
  }
  return res.json();
};

export const updatePerfil = async (token, data) => {
  const res = await fetch(`${API_URL}/auth/mi-perfil`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Error al actualizar perfil' }));
    throw new Error(error.message || 'Error al actualizar perfil');
  }

  return res.json();
};


// =========================
//      LOGIN
// =========================
export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || errorData.message || 'Error en el inicio de sesión');
  }

  return res.json();
};

// =========================
//      REGISTER
// =========================
export const register = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const errorData = await res.json();
      throw new Error(errorData.error || errorData.message || "Error en el registro");
    } else {
      const errorText = await res.text();
      throw new Error(errorText || "Error en el registro (500)");
    }
  }

  return res.json();
};
