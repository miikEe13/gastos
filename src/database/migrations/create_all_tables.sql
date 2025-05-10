-- Script para crear toda la estructura de la base de datos desde cero

-- Crear base de datos (descomenta si necesitas crearla)
-- CREATE DATABASE IF NOT EXISTS expenses_db;
-- USE expenses_db;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255) DEFAULT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear tabla de gastos
CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    category_id INT,
    user_id INT,
    is_fixed BOOLEAN DEFAULT FALSE,
    is_installment BOOLEAN DEFAULT FALSE,
    total_installments INT DEFAULT NULL,
    current_installment INT DEFAULT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_expenses_category ON expenses (category_id);
CREATE INDEX idx_expenses_date ON expenses (date);
CREATE INDEX idx_expenses_is_fixed ON expenses (is_fixed);
CREATE INDEX idx_expenses_is_installment ON expenses (is_installment);
CREATE INDEX idx_expenses_user_id ON expenses (user_id);

-- Insertar categorías básicas
INSERT INTO categories (name, description) VALUES 
('Alimentación', 'Gastos relacionados con comida y supermercado'),
('Vivienda', 'Gastos de alquiler, hipoteca y servicios'),
('Transporte', 'Gastos de transporte público, gasolina, etc.'),
('Entretenimiento', 'Gastos de ocio, cine, restaurantes, etc.'),
('Salud', 'Gastos médicos, medicamentos, seguro médico'),
('Educación', 'Gastos relacionados con formación y educación'),
('Servicios', 'Gastos de servicios como internet, teléfono, etc.'),
('Ropa', 'Gastos en vestimenta y calzado'),
('Otros', 'Gastos que no entran en otras categorías');

-- Crear usuario administrador (password: admin123)
INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@example.com', '$2b$10$pMHvoDIJrndkRq0fYQVXXOOKr0Smijm1YdRO3RQXu9x1k0mhyBzDa', 'admin');

-- Crear usuario regular (password: user123)
INSERT INTO users (username, email, password, role) 
VALUES ('user', 'user@example.com', '$2b$10$aPlwP3AJHyvxHfBiJbnJKOOJJBSfWCrABbXLmDGFYkybvW7MmSE7u', 'user'); 