// src/middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import { findUserById } from "../models/User.js";

export const verificarToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "❌ Acceso denegado. No hay token" });
    }

    // Decodificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuario en la BD
    const user = await findUserById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "❌ Usuario no encontrado" });
    }

    // Validar que siga activo
    if (user.estado !== 1) {
      return res.status(403).json({ message: "❌ Usuario inactivo" });
    }

    // Validar fechas de acceso
    const ahora = new Date();
    if (user.fecha_inicio && new Date(user.fecha_inicio) > ahora) {
      return res.status(403).json({ message: "❌ El acceso aún no está habilitado" });
    }
    if (user.fecha_fin && new Date(user.fecha_fin) < ahora) {
      return res.status(403).json({ message: "❌ El acceso ha expirado" });
    }

    // Guardamos todo en req.user directamente
    req.user = {
      id: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol || null, // ahora viene directamente de findUserById con JOIN a roles
    };

    next();
  } catch (error) {
    console.error("❌ Error en verificarToken:", error.message);
    res.status(403).json({ message: "❌ Token inválido o expirado" });
  }
};
