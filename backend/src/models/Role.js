// src/models/Role.js
import pool from "../config/db.js";

// Crear un nuevo rol
export const createRole = async (nombre) => {
  const [result] = await pool.query("INSERT INTO roles (nombre) VALUES (?)", [nombre]);
  return result.insertId;
};

// Obtener todos los roles
export const getAllRoles = async () => {
  const [rows] = await pool.query("SELECT * FROM roles");
  return rows;
};

// Buscar rol por nombre
export const findRoleByName = async (nombre) => {
  const [rows] = await pool.query("SELECT * FROM roles WHERE nombre = ? LIMIT 1", [nombre]);
  return rows[0];
};

// Buscar rol por id
export const findRoleById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM roles WHERE id = ? LIMIT 1", [id]);
  return rows[0];
};

// Eliminar rol
export const deleteRoleById = async (id) => {
  await pool.query("DELETE FROM roles WHERE id = ?", [id]);
};
