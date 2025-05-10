const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('./user.model');

// Secret key for JWT - should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

class AuthService {
    /**
     * Register a new user
     * @param {string} username - Username
     * @param {string} email - Email
     * @param {string} password - Plain text password
     * @param {string} role - User role (optional)
     * @param {string} profileImage - Profile image path (optional)
     * @returns {Promise} Promise with user object
     */
    static async register(username, email, password, role = 'user', profileImage = null) {
        if (!username || !email || !password) {
            throw new Error('Username, email, and password are required');
        }

        // Check if username already exists
        const usernameExists = await new Promise((resolve, reject) => {
            UserModel.findByUsername(username, (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0);
            });
        });

        if (usernameExists) {
            throw new Error('Username already exists');
        }

        // Check if email already exists
        const emailExists = await new Promise((resolve, reject) => {
            UserModel.findByEmail(email, (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0);
            });
        });

        if (emailExists) {
            throw new Error('Email already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const userData = {
            username,
            email,
            password: hashedPassword,
            role,
            profile_image: profileImage
        };

        const userId = await new Promise((resolve, reject) => {
            UserModel.create(userData, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });

        // Get user without password
        return new Promise((resolve, reject) => {
            UserModel.findById(userId, (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) {
                    return reject(new Error('User not found after creation'));
                }
                resolve(result[0]);
            });
        });
    }

    /**
     * Login user and generate JWT token
     * @param {string} username - Username or email
     * @param {string} password - Plain text password
     * @returns {Promise} Promise with token and user object
     */
    static async login(username, password) {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        // Find user by username or email
        const user = await new Promise((resolve, reject) => {
            // Check if input is email
            const isEmail = username.includes('@');
            
            if (isEmail) {
                UserModel.findByEmail(username, (err, result) => {
                    if (err) return reject(err);
                    if (result.length === 0) {
                        return reject(new Error('Invalid credentials'));
                    }
                    resolve(result[0]);
                });
            } else {
                UserModel.findByUsername(username, (err, result) => {
                    if (err) return reject(err);
                    if (result.length === 0) {
                        return reject(new Error('Invalid credentials'));
                    }
                    resolve(result[0]);
                });
            }
        });

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT
        const payload = {
            userId: user.id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // Return token and user (without password)
        const { password: _, ...userWithoutPassword } = user;
        return {
            token,
            user: userWithoutPassword
        };
    }

    /**
     * Validate a JWT token
     * @param {string} token - JWT token
     * @returns {Promise} Promise with decoded token
     */
    static async validateToken(token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return decoded;
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    /**
     * Get user by ID
     * @param {number} id - User ID
     * @returns {Promise} Promise with user object
     */
    static async getUserById(id) {
        return new Promise((resolve, reject) => {
            UserModel.findById(id, (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) {
                    return reject(new Error('User not found'));
                }
                resolve(result[0]);
            });
        });
    }

    /**
     * Change user password
     * @param {number} userId - User ID
     * @param {string} currentPassword - Current plain text password
     * @param {string} newPassword - New plain text password
     * @returns {Promise} Promise with success message
     */
    static async changePassword(userId, currentPassword, newPassword) {
        if (!userId || !currentPassword || !newPassword) {
            throw new Error('User ID, current password, and new password are required');
        }

        // Find user
        const user = await new Promise((resolve, reject) => {
            UserModel.findByUsername(userId, (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) {
                    return reject(new Error('User not found'));
                }
                resolve(result[0]);
            });
        });

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new Error('Current password is incorrect');
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        await new Promise((resolve, reject) => {
            UserModel.updatePassword(userId, hashedPassword, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        return { message: 'Password updated successfully' };
    }

    /**
     * Update user profile image
     * @param {number} userId - User ID
     * @param {string} profileImage - Path or URL to profile image
     * @returns {Promise} Promise with updated user
     */
    static async updateProfileImage(userId, profileImage) {
        if (!userId || !profileImage) {
            throw new Error('User ID and profile image are required');
        }

        // Update profile image
        await new Promise((resolve, reject) => {
            UserModel.updateProfileImage(userId, profileImage, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        // Get updated user
        return this.getUserById(userId);
    }
}

module.exports = AuthService; 