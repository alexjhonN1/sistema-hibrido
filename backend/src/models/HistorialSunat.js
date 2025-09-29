import pool from "../config/db.js";

// Guardar acción de consulta
export const createHistorialSunat = async (user_id, ruc, accion) => {
  const [result] = await pool.query(
    "INSERT INTO historial_sunat (user_id, ruc, accion) VALUES (?, ?, ?)",
    [user_id, ruc, accion]
  );
  return result.insertId;
};

// Listar historial de un usuario
export const getHistorialByUser = async (user_id) => {
  const [rows] = await pool.query("SELECT * FROM historial_sunat WHERE user_id = ?", [user_id]);
  return rows;
};
