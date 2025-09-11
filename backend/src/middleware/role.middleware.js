export const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    const { rol } = req.user; // req.user viene del middleware verificarToken

    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ message: "❌ No tienes permisos suficientes" });
    }

    next();
  };
};
