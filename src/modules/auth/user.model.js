const db = require('../../config/db');

/**
 * User model for authentication
 */
class UserModel {
    /**
     * Find a user by username
     * @param {string} username - Username to search
     * @param {function} callback - Callback function
     */
    static findByUsername(username, callback) {
        db.query('SELECT * FROM users WHERE username = ?', [username], callback);
    }

    /**
     * Find a user by email
     * @param {string} email - Email to search
     * @param {function} callback - Callback function
     */
    static findByEmail(email, callback) {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    }

    /**
     * Find a user by ID
     * @param {number} id - User ID
     * @param {function} callback - Callback function
     */
    static findById(id, callback) {
        db.query('SELECT id, username, email, profile_image, role, created_at, updated_at FROM users WHERE id = ?', [id], callback);
    }

    /**
     * Create a new user
     * @param {Object} userData - User data object
     * @param {function} callback - Callback function
     */
    static create(userData, callback) {
        const { username, email, password, role, profile_image } = userData;
        db.query(
            'INSERT INTO users (username, email, password, role, profile_image) VALUES (?, ?, ?, ?, ?)',
            [username, email, password, role || 'user', profile_image || null],
            callback
        );
    }

    /**
     * Update a user
     * @param {number} id - User ID
     * @param {Object} userData - User data to update
     * @param {function} callback - Callback function
     */
    static update(id, userData, callback) {
        const { username, email, role, profile_image } = userData;
        db.query(
            'UPDATE users SET username = ?, email = ?, role = ?, profile_image = ? WHERE id = ?',
            [username, email, role, profile_image, id],
            callback
        );
    }

    /**
     * Update user password
     * @param {number} id - User ID
     * @param {string} password - New hashed password
     * @param {function} callback - Callback function
     */
    static updatePassword(id, password, callback) {
        db.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [password, id],
            callback
        );
    }

    /**
     * Update user profile image
     * @param {number} id - User ID
     * @param {string} profileImage - Path or URL to profile image
     * @param {function} callback - Callback function
     */
    static updateProfileImage(id, profileImage, callback) {
        db.query(
            'UPDATE users SET profile_image = ? WHERE id = ?',
            [profileImage, id],
            callback
        );
    }

    /**
     * Delete a user
     * @param {number} id - User ID
     * @param {function} callback - Callback function
     */
    static delete(id, callback) {
        db.query('DELETE FROM users WHERE id = ?', [id], callback);
    }

    /**
     * Get all users (without password)
     * @param {function} callback - Callback function
     */
    static getAll(callback) {
        db.query('SELECT id, username, email, profile_image, role, created_at, updated_at FROM users', callback);
    }
}

module.exports = UserModel; 