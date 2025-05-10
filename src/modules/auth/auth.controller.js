const AuthService = require('./auth.service');

/**
 * Auth Controller
 */
class AuthController {
    /**
     * Register a new user
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    static async register(req, res) {
        try {
            const { username, email, password, role } = req.body;
            
            // Obtener la imagen de perfil si existe
            let profileImage = null;
            if (req.file) {
                profileImage = req.file.path;
            }

            const user = await AuthService.register(username, email, password, role, profileImage);
            res.status(201).json({
                message: 'Usuario registrado exitosamente',
                user
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Login user
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    static async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await AuthService.login(username, password);
            res.status(200).json({
                message: 'Login exitoso',
                ...result
            });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    /**
     * Get user profile
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    static async getProfile(req, res) {
        try {
            const userId = req.user.userId;
            const user = await AuthService.getUserById(userId);
            res.status(200).json({ user });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    /**
     * Update user profile image
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    static async updateProfileImage(req, res) {
        try {
            const userId = req.user.userId;
            
            if (!req.file) {
                return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
            }

            const profileImage = req.file.path;
            const user = await AuthService.updateProfileImage(userId, profileImage);
            
            res.status(200).json({
                message: 'Imagen de perfil actualizada exitosamente',
                user
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    /**
     * Change user password
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     */
    static async changePassword(req, res) {
        try {
            const userId = req.user.userId;
            const { currentPassword, newPassword } = req.body;
            
            const result = await AuthService.changePassword(userId, currentPassword, newPassword);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = AuthController; 