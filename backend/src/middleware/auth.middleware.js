import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer token"

  if (!token) {
    return res.status(403).json({ message: "⚠️ Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guarda info del usuario en req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: "❌ Token inválido o expirado" });
  }
};
