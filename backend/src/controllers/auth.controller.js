// src/controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../models/User.js";
import { findRoleByName } from "../models/Role.js";

// ✅ Registro (siempre TRABAJADOR por defecto)
export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ message: "⚠️ Todos los campos son obligatorios" });
    }

    // Verificar si ya existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "⚠️ El correo ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buscar rol TRABAJADOR
    const rol = await findRoleByName("TRABAJADOR");
    if (!rol) {
      return res.status(500).json({ message: "⚠️ Rol TRABAJADOR no está definido en la base de datos" });
    }

    // Crear usuario directamente con role_id
    const userId = await createUser(nombre, email, hashedPassword, rol.id);

    res.status(201).json({
      message: "✅ Usuario registrado correctamente",
      userId,
    });
  } catch (error) {
    console.error("❌ Error en register:", error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};

// ✅ Login con validación de fechas y roles
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "⚠️ Usuario no encontrado" });
    }

    // Validar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "⚠️ Contraseña incorrecta" });
    }

    // Validar fechas
    const ahora = new Date();
    if (user.fecha_inicio && new Date(user.fecha_inicio) > ahora) {
      return res.status(403).json({ message: "⚠️ El acceso aún no está habilitado" });
    }
    if (user.fecha_fin && new Date(user.fecha_fin) < ahora) {
      return res.status(403).json({ message: "⚠️ El acceso ha expirado" });
    }

    // Obtener rol directamente desde user.role_id ya unido con roles en findUserByEmail
    const roleNombre = user.rol || "TRABAJADOR";

    // Generar token
    const token = jwt.sign(
      { id: user.id, email: user.email, rol: roleNombre },
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
        rol: roleNombre,
        fecha_inicio: user.fecha_inicio,
        fecha_fin: user.fecha_fin,
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
};
