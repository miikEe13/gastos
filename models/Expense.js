// models/Expense.js
const db = require('../config/db');

const Expense = {
    // Retrieve all expenses
    getAll: (callback) => {
        db.query('SELECT * FROM expenses', callback);
    },

    // Retrieve an expense by ID
    getById: (id, callback) => {
        db.query('SELECT * FROM expenses WHERE id = ?', [id], callback);
    },

    // Retrieve expenses by month and year
    getByMonthAndYear: (month, year, callback) => {
        db.query(
            'SELECT * FROM expenses WHERE MONTH(date) = ? AND YEAR(date) = ?',
            [month, year],
            callback
        );
    },

    // Retrieve monthly summary by month and year
    getMonthlySummaryByYear: (month, year, callback) => {
        db.query(
            `SELECT 
                COUNT(*) AS totalExpenses, 
                SUM(amount) AS totalAmount, 
                AVG(amount) AS averageAmount 
            FROM expenses 
            WHERE MONTH(date) = ? AND YEAR(date) = ?`,
            [month, year],
            callback
        );
    },

    // Create a new expense
    create: (description, amount, date, callback) => {
        db.query(
            'INSERT INTO expenses (description, amount, date) VALUES (?, ?, ?)',
            [description, amount, date],
            callback
        );
    },

    // Create multiple expenses
    createMultiple: (expenses, callback) => {
        const values = expenses.map(expense => [expense.description, expense.amount, expense.date]);
        db.query(
            'INSERT INTO expenses (description, amount, date) VALUES ?',
            [values],
            callback
        );
    },

    // Update an expense by ID
    update: (id, description, amount, date, callback) => {
        db.query(
            'UPDATE expenses SET description = ?, amount = ?, date = ? WHERE id = ?',
            [description, amount, date, id],
            callback
        );
    },

    // Delete an expense by ID
    delete: (id, callback) => {
        db.query('DELETE FROM expenses WHERE id = ?', [id], callback);
    }
};

module.exports = Expense;
