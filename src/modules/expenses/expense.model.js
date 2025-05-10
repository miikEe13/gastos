const db = require('../../config/db');

/**
 * Modelo para la entidad de Gastos
 */
class ExpenseModel {
    /**
     * Obtiene todos los gastos
     * @param {function} callback - Función callback (err, results)
     */
    static getAll(callback) {
        const query = `
            SELECT e.*, c.name as category_name 
            FROM expenses e 
            LEFT JOIN categories c ON e.category_id = c.id 
            ORDER BY e.date DESC
        `;
        db.query(query, callback);
    }

    /**
     * Obtiene todos los gastos de un usuario
     * @param {number} userId - ID del usuario
     * @param {function} callback - Función callback (err, results)
     */
    static getAllByUser(userId, callback) {
        const query = `
            SELECT e.*, c.name as category_name 
            FROM expenses e 
            LEFT JOIN categories c ON e.category_id = c.id 
            WHERE e.user_id = ?
            ORDER BY e.date DESC
        `;
        db.query(query, [userId], callback);
    }

    /**
     * Obtiene un gasto por su ID
     * @param {number} id - ID del gasto
     * @param {function} callback - Función callback (err, results)
     */
    static getById(id, callback) {
        const query = `
            SELECT e.*, c.name as category_name 
            FROM expenses e 
            LEFT JOIN categories c ON e.category_id = c.id 
            WHERE e.id = ?
        `;
        db.query(query, [id], callback);
    }

    /**
     * Obtiene un gasto por su ID y el ID del usuario
     * @param {number} id - ID del gasto
     * @param {number} userId - ID del usuario
     * @param {function} callback - Función callback (err, results)
     */
    static getByIdAndUser(id, userId, callback) {
        const query = `
            SELECT e.*, c.name as category_name 
            FROM expenses e 
            LEFT JOIN categories c ON e.category_id = c.id 
            WHERE e.id = ? AND e.user_id = ?
        `;
        db.query(query, [id, userId], callback);
    }

    /**
     * Obtiene gastos por mes y año
     * @param {number} month - Mes (1-12)
     * @param {number} year - Año
     * @param {function} callback - Función callback (err, results)
     */
    static getByMonthAndYear(month, year, callback) {
        const query = `
            SELECT e.*, c.name as category_name 
            FROM expenses e 
            LEFT JOIN categories c ON e.category_id = c.id 
            WHERE MONTH(e.date) = ? AND YEAR(e.date) = ? 
            ORDER BY e.date DESC
        `;
        db.query(query, [month, year], callback);
    }

    /**
     * Obtiene gastos por mes, año y usuario
     * @param {number} month - Mes (1-12)
     * @param {number} year - Año
     * @param {number} userId - ID del usuario
     * @param {function} callback - Función callback (err, results)
     */
    static getByMonthYearAndUser(month, year, userId, callback) {
        const query = `
            SELECT e.*, c.name as category_name 
            FROM expenses e 
            LEFT JOIN categories c ON e.category_id = c.id 
            WHERE MONTH(e.date) = ? AND YEAR(e.date) = ? AND e.user_id = ?
            ORDER BY e.date DESC
        `;
        db.query(query, [month, year, userId], callback);
    }

    /**
     * Obtiene resumen mensual por mes y año
     * @param {number} month - Mes (1-12)
     * @param {number} year - Año
     * @param {function} callback - Función callback (err, results)
     */
    static getMonthlySummaryByYear(month, year, callback) {
        const query = `
            SELECT 
                COUNT(*) AS totalExpenses, 
                SUM(amount) AS totalAmount, 
                AVG(amount) AS averageAmount,
                MIN(amount) AS minAmount,
                MAX(amount) AS maxAmount,
                SUM(CASE WHEN is_fixed = 1 THEN amount ELSE 0 END) AS fixedExpenses,
                SUM(CASE WHEN is_fixed = 0 THEN amount ELSE 0 END) AS variableExpenses,
                SUM(CASE WHEN is_installment = 1 THEN amount ELSE 0 END) AS installmentExpenses
            FROM expenses 
            WHERE MONTH(date) = ? AND YEAR(date) = ?
        `;
        db.query(query, [month, year], callback);
    }

    /**
     * Obtiene resumen mensual por mes, año y usuario
     * @param {number} month - Mes (1-12)
     * @param {number} year - Año
     * @param {number} userId - ID del usuario
     * @param {function} callback - Función callback (err, results)
     */
    static getMonthlySummaryByYearAndUser(month, year, userId, callback) {
        const query = `
            SELECT 
                COUNT(*) AS totalExpenses, 
                SUM(amount) AS totalAmount, 
                AVG(amount) AS averageAmount,
                MIN(amount) AS minAmount,
                MAX(amount) AS maxAmount,
                SUM(CASE WHEN is_fixed = 1 THEN amount ELSE 0 END) AS fixedExpenses,
                SUM(CASE WHEN is_fixed = 0 THEN amount ELSE 0 END) AS variableExpenses,
                SUM(CASE WHEN is_installment = 1 THEN amount ELSE 0 END) AS installmentExpenses
            FROM expenses 
            WHERE MONTH(date) = ? AND YEAR(date) = ? AND user_id = ?
        `;
        db.query(query, [month, year, userId], callback);
    }

    /**
     * Obtiene resumen por categorías
     * @param {number} month - Mes (1-12)
     * @param {number} year - Año
     * @param {function} callback - Función callback (err, results)
     */
    static getCategorySummary(month, year, callback) {
        const query = `
            SELECT 
                c.id,
                c.name as category,
                COUNT(*) as count,
                SUM(e.amount) as total,
                AVG(e.amount) as average
            FROM expenses e
            LEFT JOIN categories c ON e.category_id = c.id
            WHERE MONTH(e.date) = ? AND YEAR(e.date) = ?
            GROUP BY e.category_id
            ORDER BY total DESC
        `;
        db.query(query, [month, year], callback);
    }

    /**
     * Obtiene resumen por categorías para un usuario específico
     * @param {number} month - Mes (1-12)
     * @param {number} year - Año
     * @param {number} userId - ID del usuario
     * @param {function} callback - Función callback (err, results)
     */
    static getCategorySummaryByUser(month, year, userId, callback) {
        const query = `
            SELECT 
                c.id,
                c.name as category,
                COUNT(*) as count,
                SUM(e.amount) as total,
                AVG(e.amount) as average
            FROM expenses e
            LEFT JOIN categories c ON e.category_id = c.id
            WHERE MONTH(e.date) = ? AND YEAR(e.date) = ? AND e.user_id = ?
            GROUP BY e.category_id
            ORDER BY total DESC
        `;
        db.query(query, [month, year, userId], callback);
    }

    /**
     * Obtiene todos los gastos fijos
     * @param {function} callback - Función callback (err, results)
     */
    static getFixedExpenses(callback) {
        const query = `
            SELECT e.*, c.name as category_name 
            FROM expenses e 
            LEFT JOIN categories c ON e.category_id = c.id 
            WHERE e.is_fixed = 1
            ORDER BY e.amount DESC
        `;
        db.query(query, callback);
    }

    /**
     * Obtiene todos los gastos fijos de un usuario
     * @param {number} userId - ID del usuario
     * @param {function} callback - Función callback (err, results)
     */
    static getFixedExpensesByUser(userId, callback) {
        const query = `
            SELECT e.*, c.name as category_name 
            FROM expenses e 
            LEFT JOIN categories c ON e.category_id = c.id 
            WHERE e.is_fixed = 1 AND e.user_id = ?
            ORDER BY e.amount DESC
        `;
        db.query(query, [userId], callback);
    }

    /**
     * Obtiene todos los gastos a plazos
     * @param {function} callback - Función callback (err, results)
     */
    static getInstallmentExpenses(callback) {
        const query = `
            SELECT e.*, c.name as category_name 
            FROM expenses e 
            LEFT JOIN categories c ON e.category_id = c.id 
            WHERE e.is_installment = 1
            ORDER BY e.date DESC
        `;
        db.query(query, callback);
    }

    /**
     * Obtiene todos los gastos a plazos de un usuario
     * @param {number} userId - ID del usuario
     * @param {function} callback - Función callback (err, results)
     */
    static getInstallmentExpensesByUser(userId, callback) {
        const query = `
            SELECT e.*, c.name as category_name 
            FROM expenses e 
            LEFT JOIN categories c ON e.category_id = c.id 
            WHERE e.is_installment = 1 AND e.user_id = ?
            ORDER BY e.date DESC
        `;
        db.query(query, [userId], callback);
    }

    /**
     * Crea un nuevo gasto
     * @param {Object} expense - Objeto de gasto
     * @param {function} callback - Función callback (err, results)
     */
    static create(expense, callback) {
        const { 
            description, 
            amount, 
            date, 
            category_id, 
            is_fixed, 
            is_installment, 
            total_installments,
            current_installment,
            notes,
            user_id
        } = expense;

        const query = `
            INSERT INTO expenses (
                description, 
                amount, 
                date, 
                category_id, 
                is_fixed, 
                is_installment, 
                total_installments,
                current_installment,
                notes,
                user_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        db.query(
            query,
            [
                description, 
                amount, 
                date, 
                category_id || null, 
                is_fixed || false, 
                is_installment || false, 
                total_installments || null,
                current_installment || null,
                notes || null,
                user_id
            ],
            callback
        );
    }

    /**
     * Crea múltiples gastos
     * @param {Array} expenses - Array de objetos de gastos
     * @param {function} callback - Función callback (err, results)
     */
    static createMultiple(expenses, callback) {
        const values = expenses.map(expense => [
            expense.description, 
            expense.amount, 
            expense.date, 
            expense.category_id || null, 
            expense.is_fixed || false, 
            expense.is_installment || false, 
            expense.total_installments || null,
            expense.current_installment || null,
            expense.notes || null,
            expense.user_id
        ]);

        const query = `
            INSERT INTO expenses (
                description, 
                amount, 
                date, 
                category_id, 
                is_fixed, 
                is_installment, 
                total_installments,
                current_installment,
                notes,
                user_id
            ) VALUES ?
        `;
        
        db.query(query, [values], callback);
    }

    /**
     * Actualiza un gasto existente
     * @param {number} id - ID del gasto
     * @param {Object} expense - Objeto con datos a actualizar
     * @param {function} callback - Función callback (err, results)
     */
    static update(id, expense, callback) {
        const { 
            description, 
            amount, 
            date, 
            category_id, 
            is_fixed, 
            is_installment, 
            total_installments,
            current_installment,
            notes
        } = expense;

        const query = `
            UPDATE expenses 
            SET 
                description = ?, 
                amount = ?, 
                date = ?, 
                category_id = ?, 
                is_fixed = ?, 
                is_installment = ?, 
                total_installments = ?,
                current_installment = ?,
                notes = ?
            WHERE id = ?
        `;
        
        db.query(
            query,
            [
                description, 
                amount, 
                date, 
                category_id || null, 
                is_fixed || false, 
                is_installment || false, 
                total_installments || null,
                current_installment || null,
                notes || null,
                id
            ],
            callback
        );
    }

    /**
     * Actualiza un gasto existente verificando también el usuario
     * @param {number} id - ID del gasto
     * @param {number} userId - ID del usuario
     * @param {Object} expense - Objeto con datos a actualizar
     * @param {function} callback - Función callback (err, results)
     */
    static updateByUser(id, userId, expense, callback) {
        const { 
            description, 
            amount, 
            date, 
            category_id, 
            is_fixed, 
            is_installment, 
            total_installments,
            current_installment,
            notes
        } = expense;

        const query = `
            UPDATE expenses 
            SET 
                description = ?, 
                amount = ?, 
                date = ?, 
                category_id = ?, 
                is_fixed = ?, 
                is_installment = ?, 
                total_installments = ?,
                current_installment = ?,
                notes = ?
            WHERE id = ? AND user_id = ?
        `;
        
        db.query(
            query,
            [
                description, 
                amount, 
                date, 
                category_id || null, 
                is_fixed || false, 
                is_installment || false, 
                total_installments || null,
                current_installment || null,
                notes || null,
                id,
                userId
            ],
            callback
        );
    }

    /**
     * Elimina un gasto
     * @param {number} id - ID del gasto
     * @param {function} callback - Función callback (err, results)
     */
    static delete(id, callback) {
        db.query('DELETE FROM expenses WHERE id = ?', [id], callback);
    }

    /**
     * Elimina un gasto verificando también el usuario
     * @param {number} id - ID del gasto
     * @param {number} userId - ID del usuario
     * @param {function} callback - Función callback (err, results)
     */
    static deleteByUser(id, userId, callback) {
        db.query('DELETE FROM expenses WHERE id = ? AND user_id = ?', [id, userId], callback);
    }
}

module.exports = ExpenseModel; 