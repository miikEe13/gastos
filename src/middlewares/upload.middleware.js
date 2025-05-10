const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Crear directorio de uploads si no existe
const uploadDir = path.join(__dirname, '../../uploads/profiles');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'profile-' + uniqueSuffix + ext);
    }
});

// Filtro para sólo permitir imágenes
const fileFilter = (req, file, cb) => {
    // Aceptar solo imágenes
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('El archivo debe ser una imagen'), false);
    }
};

// Configuración de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // límite de 5MB
    }
});

// Middleware para manejar errores de multer
const handleUploadErrors = (req, res, next) => {
    return function(err) {
        if (err instanceof multer.MulterError) {
            // Error de multer
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'El archivo es demasiado grande. Máximo 5MB.' });
            }
            return res.status(400).json({ error: `Error al subir el archivo: ${err.message}` });
        } else if (err) {
            // Error personalizado
            return res.status(400).json({ error: err.message });
        }
        next();
    };
};

module.exports = {
    uploadProfileImage: (req, res, next) => {
        const uploadSingle = upload.single('profileImage');
        uploadSingle(req, res, (err) => {
            if (err) {
                return handleUploadErrors(req, res, next)(err);
            }
            next();
        });
    }
}; 