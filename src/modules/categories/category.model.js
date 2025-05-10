const db = require('../../config/db');

/**
 * Modelo para la entidad de Categorías
 */
class CategoryModel {
    /**
     * Obtiene todas las categorías
     * @param {function} callback - Función callback (err, results)
     */
    static getAll(callback) {
        db.query('SELECT * FROM categories ORDER BY name ASC', callback);
    }

    /**
     * Obtiene una categoría por su ID
     * @param {number} id - ID de la categoría
     * @param {function} callback - Función callback (err, results)
     */
    static getById(id, callback) {
        db.query('SELECT * FROM categories WHERE id = ?', [id], callback);
    }

    /**
     * Crea una nueva categoría
     * @param {string} name - Nombre de la categoría
     * @param {string} description - Descripción de la categoría
     * @param {function} callback - Función callback (err, results)
     */
    static create(name, description, callback) {
        db.query(
            'INSERT INTO categories (name, description) VALUES (?, ?)',
            [name, description],
            callback
        );
    }

    /**
     * Actualiza una categoría por su ID
     * @param {number} id - ID de la categoría
     * @param {string} name - Nombre de la categoría
     * @param {string} description - Descripción de la categoría
     * @param {function} callback - Función callback (err, results)
     */
    static update(id, name, description, callback) {
        db.query(
            'UPDATE categories SET name = ?, description = ? WHERE id = ?',
            [name, description, id],
            callback
        );
    }

    /**
     * Elimina una categoría por su ID
     * @param {number} id - ID de la categoría
     * @param {function} callback - Función callback (err, results)
     */
    static delete(id, callback) {
        db.query('DELETE FROM categories WHERE id = ?', [id], callback);
    }

    /**
     * Obtiene el número de gastos asociados a una categoría
     * @param {number} id - ID de la categoría
     * @param {function} callback - Función callback (err, results)
     */
    static getExpenseCount(id, callback) {
        db.query(
            'SELECT COUNT(*) as count FROM expenses WHERE category_id = ?',
            [id],
            callback
        );
    }
}

module.exports = CategoryModel; 