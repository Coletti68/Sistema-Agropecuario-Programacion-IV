const API_URL = 'http://localhost:3000/api';

export const getProductores = async () => {
  const res = await fetch(`${API_URL}/productores`);
  return res.json();
};

export const crearCultivo = async (data) => {
  const res = await fetch(`${API_URL}/cultivos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};