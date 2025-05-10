#!/bin/bash

# Script para configurar la base de datos desde cero

# Colores para mejor legibilidad
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Configuración de la base de datos para Gastos API ===${NC}"

# Solicitar información de la base de datos
read -p "Ingresa el nombre de usuario de MySQL: " DB_USER
read -sp "Ingresa la contraseña de MySQL: " DB_PASSWORD
echo ""
read -p "Ingresa el nombre de la base de datos (por defecto: expenses_db): " DB_NAME
DB_NAME=${DB_NAME:-expenses_db}
read -p "Ingresa el host de la base de datos (por defecto: localhost): " DB_HOST
DB_HOST=${DB_HOST:-localhost}

# Crear la base de datos
echo -e "${BLUE}Creando base de datos $DB_NAME...${NC}"
mysql -u$DB_USER -p$DB_PASSWORD -h$DB_HOST -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Base de datos creada exitosamente.${NC}"
else
    echo -e "${RED}Error al crear la base de datos.${NC}"
    exit 1
fi

# Ejecutar el script SQL para crear todas las tablas
echo -e "${BLUE}Creando tablas...${NC}"
mysql -u$DB_USER -p$DB_PASSWORD -h$DB_HOST $DB_NAME < src/database/migrations/create_all_tables.sql

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Tablas creadas exitosamente.${NC}"
else
    echo -e "${RED}Error al crear las tablas.${NC}"
    exit 1
fi

# Crear o actualizar archivo .env
echo -e "${BLUE}Actualizando archivo .env...${NC}"

# Generar un JWT_SECRET aleatorio
JWT_SECRET=$(openssl rand -base64 32)

cat > .env << EOF
PORT=3000
DB_HOST=$DB_HOST
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
DB_NAME=$DB_NAME
DB_PORT=3306
NODE_ENV=development
JWT_SECRET=$JWT_SECRET
JWT_EXPIRES_IN=24h
CORS_ORIGIN=*
CORS_METHODS=GET,POST,PUT,DELETE
CORS_HEADERS=Content-Type,Authorization
EOF

echo -e "${GREEN}Archivo .env creado exitosamente.${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Configuración completada exitosamente.${NC}"
echo -e "${BLUE}Usuarios predeterminados:${NC}"
echo -e "  Admin: admin@example.com / admin123"
echo -e "  Usuario: user@example.com / user123"
echo -e "${GREEN}========================================${NC}"

# Hacer el script ejecutable
chmod +x setup_database.sh 