#!/bin/bash

# Script para iniciar la aplicación Gastos API

# Colores para mejor legibilidad
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Iniciando Gastos API ===${NC}"

# Verificar si se ha configurado la base de datos
if [ ! -f .env ]; then
    echo -e "${YELLOW}Archivo .env no encontrado. Configurando la base de datos...${NC}"
    ./setup_database.sh
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error en la configuración de la base de datos. Abortando.${NC}"
        exit 1
    fi
fi

# Verificar las dependencias de Node.js
echo -e "${BLUE}Verificando dependencias...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Instalando dependencias...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error al instalar las dependencias. Abortando.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Dependencias instaladas correctamente.${NC}"
else
    echo -e "${GREEN}Dependencias ya están instaladas.${NC}"
fi

# Verificar si existe la carpeta de uploads
if [ ! -d "uploads/profiles" ]; then
    echo -e "${YELLOW}Creando directorio para imágenes de perfil...${NC}"
    mkdir -p uploads/profiles
    touch uploads/profiles/.gitkeep
    echo -e "${GREEN}Directorio creado correctamente.${NC}"
fi

# Iniciar la aplicación en modo desarrollo
echo -e "${GREEN}Iniciando la aplicación en modo desarrollo...${NC}"
echo -e "${YELLOW}Para detener la aplicación, presiona Ctrl+C${NC}"
echo -e "${BLUE}========================================${NC}"
npm run dev 