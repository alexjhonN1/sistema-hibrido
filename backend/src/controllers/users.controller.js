// src/controllers/users.controller.js
import {
  getAllUsers,
  updateUserById,
  deleteUserById,
  findUserById,
  updateUserRoleId,
  createUser,
} from "../models/User.js";
import { findRoleByName } from "../models/Role.js";

// ✅ Obtener todos los usuarios con rol
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    const usersWithRoles = users.map((u) => ({
      ...u,
      rol: u.rol || "SIN ROL",
    }));

    res.json({ success: true, users: usersWithRoles });
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error.message);
    res.status(500).json({ success: false, message: "Error al obtener usuarios" });
  }
};

// ✅ Crear usuario (ADMIN)
export const createUserAdmin = async (req, res) => {
  try {
    const { nombre, email, password, rol = "TRABAJADOR", fecha_inicio, fecha_fin } = req.body;

    // Validar campos obligatorios
    if (!nombre || !email || !password) {
      return res.status(400).json({ success: false, message: "Nombre, email y contraseña son obligatorios" });
    }

    // Validar rol
    const rolData = await findRoleByName(rol);
    if (!rolData) {
      return res.status(400).json({ success: false, message: `El rol '${rol}' no existe` });
    }

    // Crear usuario
    const userId = await createUser(nombre, email, password, rolData.id);

    // Actualizar fechas si existen
    if (fecha_inicio || fecha_fin) {
      await updateUserById(userId, { fecha_inicio, fecha_fin, roleId: rolData.id });
    }

    res.status(201).json({ success: true, message: "Usuario creado correctamente", userId });
  } catch (error) {
    console.error("❌ Error al crear usuario:", error.message);
    res.status(500).json({ success: false, message: "Error al crear usuario" });
  }
};

// ✅ Actualizar usuario (rol, estado, fechas)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol, estado, fecha_inicio, fecha_fin } = req.body;

    // Validar usuario existente
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    // Actualizar datos básicos
    await updateUserById(id, { estado, fecha_inicio, fecha_fin });

    // Actualizar rol si existe
    if (rol) {
      const rolData = await findRoleByName(rol);
      if (!rolData) {
        return res.status(400).json({ success: false, message: `El rol '${rol}' no existe` });
      }
      await updateUserRoleId(id, rolData.id);
    }

    res.json({ success: true, message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error.message);
    res.status(500).json({ success: false, message: "Error al actualizar usuario" });
  }
};

// ✅ Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar usuario existente
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    await deleteUserById(id);

    res.json({ success: true, message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error.message);
    res.status(500).json({ success: false, message: "Error al eliminar usuario" });
  }
};
