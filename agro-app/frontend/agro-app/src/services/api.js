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
  console.log("Fetching insumos from:", `${API_URL}/insumos`);
  const res = await fetch(`${API_URL}/insumos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    console.error("Error fetching insumos:", res.status, res.statusText);
    throw new Error('Error al cargar insumos');
  }
  const data = await res.json();
  console.log("Insumos response data:", data);
  return data;
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
    const errorData = await res.json().catch(() => ({ message: "Error al crear solicitud (sin JSON)" }));
    console.error("Error creating request. Status:", res.status, "Data:", errorData);
    throw new Error(errorData.message || errorData.error || `Error ${res.status}: No se pudo crear la solicitud`);
  }

  return res.json();
};

export const getSolicitudes = async (token) => {
  const res = await fetch(`${API_URL}/solicitudes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Error al obtener solicitudes" }));
    throw new Error(errorData.message || `Error ${res.status}: No se pudo obtener las solicitudes`);
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
    throw new Error(error.message);
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
    throw new Error(error.message);
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
    throw new Error(errorData.error || errorData.message);
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
    if (contentType?.includes("application/json")) {
      const errorData = await res.json();
      throw new Error(errorData.error || errorData.message);
    } else {
      throw new Error(await res.text());
    }
  }

  return res.json();
};
