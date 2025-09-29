// src/models/User.js
import pool from "../config/db.js";

// Crear usuario (por defecto estado=1 y rol TRABAJADOR)
export const createUser = async (nombre, email, password, roleId = 2) => {
  const [result] = await pool.query(
    "INSERT INTO users (nombre, email, password, estado, role_id) VALUES (?, ?, ?, ?, ?)",
    [nombre, email, password, 1, roleId]
  );
  return result.insertId;
};

// Buscar usuario por email con rol
export const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `SELECT u.*, r.nombre AS rol
     FROM users u
     LEFT JOIN roles r ON u.role_id = r.id
     WHERE u.email = ?`,
    [email]
  );
  return rows[0];
};

// Buscar usuario por id con rol
export const findUserById = async (id) => {
  const [rows] = await pool.query(
    `SELECT u.*, r.nombre AS rol
     FROM users u
     LEFT JOIN roles r ON u.role_id = r.id
     WHERE u.id = ?`,
    [id]
  );
  return rows[0];
};

// Listar todos los usuarios con rol
export const getAllUsers = async () => {
  const [rows] = await pool.query(
    `SELECT u.id, u.nombre, u.email, u.estado, u.fecha_inicio, u.fecha_fin, 
            r.nombre AS rol
     FROM users u
     LEFT JOIN roles r ON u.role_id = r.id`
  );
  return rows;
};

// Actualizar usuario (estado, fechas, opcional roleId)
export const updateUserById = async (id, { estado, fecha_inicio, fecha_fin, roleId }) => {
  // Solo actualizar roleId si se envía
  const query = `
    UPDATE users 
    SET estado = ?, 
        fecha_inicio = ?, 
        fecha_fin = ?${roleId !== undefined ? ", role_id = ?" : ""}
    WHERE id = ?
  `;
  const params = [estado, fecha_inicio || null, fecha_fin || null];
  if (roleId !== undefined) params.push(roleId);
  params.push(id);

  await pool.query(query, params);
};

// Actualizar solo el role_id de un usuario
export const updateUserRoleId = async (id, roleId) => {
  await pool.query("UPDATE users SET role_id = ? WHERE id = ?", [roleId, id]);
};

// Eliminar usuario
export const deleteUserById = async (id) => {
  await pool.query("DELETE FROM users WHERE id = ?", [id]);
};
