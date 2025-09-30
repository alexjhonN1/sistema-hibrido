import pool from "../config/db.js";

// Crear cliente
export const createCliente = async (nombre, ruc, rubro, codigo = null) => {
  if (!nombre || !ruc || !rubro) {
    throw new Error("Nombre, RUC y rubro son obligatorios");
  }

  // Limitar a máximo según base de datos
  nombre = nombre.substring(0, 150);
  ruc = ruc.substring(0, 20);
  rubro = rubro.substring(0, 100);

  // Generar código automáticamente si no se proporciona
  if (!codigo) {
    codigo = ruc.trim().charAt(0);
    codigo = /[0-9]/.test(codigo) ? codigo : "0";
  }

  const [result] = await pool.query(
    "INSERT INTO clientes (nombre, ruc, rubro, codigo, estado) VALUES (?, ?, ?, ?, 1)",
    [nombre, ruc, rubro, codigo]
  );

  return result.insertId;
};

// Listar todos los clientes activos
export const getAllClientes = async () => {
  const [rows] = await pool.query(
    "SELECT id, nombre, ruc, rubro AS categoria, codigo FROM clientes WHERE estado = 1 ORDER BY nombre ASC"
  );
  return rows;
};

// Listar clientes por código 0-9, si no se pasa código devuelve todos
export const getClientesByCodigo = async (codigo = null) => {
  let rows;
  if (codigo === null) {
    [rows] = await pool.query(
      "SELECT id, nombre, ruc, rubro AS categoria, codigo FROM clientes WHERE estado = 1 ORDER BY nombre ASC"
    );
  } else {
    [rows] = await pool.query(
      "SELECT id, nombre, ruc, rubro AS categoria, codigo FROM clientes WHERE codigo = ? AND estado = 1 ORDER BY nombre ASC",
      [codigo]
    );
  }
  return rows;
};
