const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();


const pool = require("./db");


const cultivoService = require("../backend/src/services/cultivoService");
const solicitudService = require("../backend/src/services/solicitudService");

const jwt = require("jsonwebtoken");


function verificarToken(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token no enviado");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Token inválido");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
}


exports.crearCultivo = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const decoded = verificarToken(req);
    const usuarioid = decoded.id;

    const body = req.body;

    const result = await cultivoService.crearCultivo(body, usuarioid);

    res.status(201).json({
      ok: true,
      mensaje: "Cultivo creado con éxito",
      data: result,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


exports.crearSolicitudInsumo = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const decoded = verificarToken(req);
    const usuarioid = decoded.id;

    const body = req.body;

    body.usuarioid = usuarioid;

    const result = await solicitudService.crearSolicitud(pool, body);

    res.status(201).json({
      ok: true,
      mensaje: "Solicitud creada",
      data: result,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


exports.listarCultivos = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    
    const decoded = verificarToken(req);
    const usuarioid = decoded.id;

    const result = await cultivoService.listarCultivosPorUsuario(usuarioid);

    res.status(200).json({
      ok: true,
      data: result
    });

  } catch (err) {
    console.error("Error en listarCultivos:", err);
    res.status(500).json({ error: err.message });
  }
});
