import pool from "../config/db.js";

// Crear cliente
export const createCliente = async ({ nombre, ruc, direccion, telefono }) => {
  const [result] = await pool.query(
    "INSERT INTO clientes (nombre, ruc, direccion, telefono) VALUES (?, ?, ?, ?)",
    [nombre, ruc, direccion, telefono]
  );
  return result.insertId;
};

// Listar clientes
export const getAllClientes = async () => {
  const [rows] = await pool.query("SELECT * FROM clientes");
  return rows;
};

// Buscar cliente
export const findClienteById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM clientes WHERE id = ?", [id]);
  return rows[0];
};

// Actualizar cliente
export const updateClienteById = async (id, { nombre, ruc, direccion, telefono }) => {
  await pool.query(
    "UPDATE clientes SET nombre=?, ruc=?, direccion=?, telefono=? WHERE id=?",
    [nombre, ruc, direccion, telefono, id]
  );
};

// Eliminar cliente
export const deleteClienteById = async (id) => {
  await pool.query("DELETE FROM clientes WHERE id=?", [id]);
};
