// src/controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js"; // conexión a MariaDB

// ✅ Registro
export const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
      return res
        .status(400)
        .json({ message: "⚠️ Todos los campos son obligatorios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (nombre, email, password, rol, estado) VALUES (?, ?, ?, ?, ?)",
      [nombre, email, hashedPassword, rol || "TRABAJADOR", 1] // por defecto rol TRABAJADOR y estado activo
    );

    res.status(201).json({
      message: "✅ Usuario registrado correctamente",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("❌ Error en register:", error); // 👈 mostramos el error completo, no solo el .message
    res.status(500).json({
      message: "Error al registrar usuario",
      error: error.message,
      sql: error.sql,            // 👈 línea del SQL que falló
      sqlMessage: error.sqlMessage, // 👈 mensaje de MySQL/MariaDB
    });
  }
};

// ✅ Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "⚠️ Usuario no encontrado" });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "⚠️ Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "✅ Login exitoso",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error); // mostramos objeto completo
    res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};
