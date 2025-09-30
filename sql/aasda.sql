USE sistema_hibrido;
-- ===============================================
-- 🚀 Sistema Híbrido - Base de Datos Normalizada
-- Recreación completa (Opción 2)
-- ===============================================

-- Eliminar base de datos previa
DROP DATABASE IF EXISTS sistema_hibrido;
CREATE DATABASE sistema_hibrido
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE sistema_hibrido;

-- ===============================================
-- Tabla: roles
-- ===============================================
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Insertar roles básicos
INSERT INTO roles (nombre) VALUES ('ADMIN'), ('TRABAJADOR');

-- ===============================================
-- Tabla: acciones_sunat
-- ===============================================
CREATE TABLE acciones_sunat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Insertar acciones comunes
INSERT INTO acciones_sunat (nombre) VALUES 
('Consulta RUC'),
('Redirección Buzón'),
('Acceso Sunat Fiel');

-- ===============================================
-- Tabla: users
-- ===============================================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL DEFAULT 2, -- por defecto TRABAJADOR
  estado TINYINT(1) DEFAULT 1,
  fecha_inicio DATETIME DEFAULT NULL,
  fecha_fin DATETIME DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- ===============================================
-- Tabla: historial_sunat
-- ===============================================
CREATE TABLE historial_sunat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  ruc VARCHAR(20),
  accion_id INT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (accion_id) REFERENCES acciones_sunat(id)
);

-- ===============================================
-- Usuario Admin por defecto
-- ⚠️ La contraseña debe estar encriptada con bcrypt en backend
-- Por ahora se guarda como texto plano "admin123" para pruebas
-- ===============================================
sistema_hibridosistema_hibrido