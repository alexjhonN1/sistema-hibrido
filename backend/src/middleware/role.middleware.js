// src/middleware/role.middleware.js
import { findUserById } from "../models/User.js";

/**
 * Middleware dinámico para verificar roles
 * @param {Array} rolesPermitidos - Lista de roles permitidos para acceder a la ruta
 */
export const verificarRol = (rolesPermitidos = []) => {
  return async (req, res, next) => {
    try {
      const userId = req.user?.id; // viene del middleware verificarToken
      if (!userId) {
        return res.status(401).json({ message: "❌ Usuario no autenticado" });
      }

      // Obtener usuario y su rol desde la base de datos
      const user = await findUserById(userId);
      if (!user || !user.rol) {
        return res.status(403).json({ message: "❌ No tienes un rol asignado" });
      }

      // Si rolesPermitidos está vacío, se permite cualquier rol
      if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(user.rol)) {
        return res.status(403).json({ message: "❌ No tienes permisos suficientes" });
      }

      // Guardamos el rol y el id en la request
      req.user.rol = user.rol;
      req.user.id = user.id;

      next();
    } catch (error) {
      console.error("❌ Error en verificarRol:", error.message);
      res.status(500).json({ message: "Error al verificar rol" });
    }
  };
};

/**
 * Middleware específico para ADMIN
 */
export const verificarAdmin = verificarRol(["ADMIN"]);

/**
 * Middleware para permitir varios roles dinámicos
 * Ejemplo: verificarRoles(["ADMIN", "MODERATOR"])
 */
export const verificarRoles = (rolesPermitidos) => verificarRol(rolesPermitidos);
