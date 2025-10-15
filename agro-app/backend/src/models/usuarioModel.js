import { db } from "../config/db.js";

export const UsuarioModel = {
  async getAll() {
    const [rows] = await db.query("SELECT * FROM usuario WHERE activo = 1");
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query("SELECT * FROM usuario WHERE usuarioid = ?", [id]);
    return rows[0];
  },

  async create(usuario) {
    const { rolid, nombre, email, telefono, dni, direccion, passwordhash } = usuario;
    const [result] = await db.query(
      "INSERT INTO usuario (rolid, nombre, email, telefono, dni, direccion, passwordhash) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [rolid, nombre, email, telefono, dni, direccion, passwordhash]
    );
    return { id: result.insertId, ...usuario };
  },

  async update(id, data) {
    const [result] = await db.query("UPDATE usuario SET ? WHERE usuarioid = ?", [data, id]);
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await db.query("UPDATE usuario SET activo = 0 WHERE usuarioid = ?", [id]);
    return result.affectedRows;
  }
};
