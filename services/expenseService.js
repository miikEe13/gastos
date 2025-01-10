// services/expenseService.js
const Expense = require('../models/Expense');

class ExpenseService {
    // Get all expenses
    static async getAllExpenses() {
        return new Promise((resolve, reject) => {
            Expense.getAll((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Get an expense by ID
    static async getExpenseById(id) {
        return new Promise((resolve, reject) => {
            Expense.getById(id, (err, result) => {
                if (err) return reject(err);
                console.log('result', result);
                resolve(result.length > 0 ? result[0] : null);
            });
        });
    }

    // Retrieve expenses by month and year
    static async getExpensesByMonth(month, year) {
        if (!month || !year) {
            throw new Error('Month and year are required');
        }

        try {
            return await new Promise((resolve, reject) => {
                Expense.getByMonthAndYear(month, year, (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            });
        } catch (error) {
            throw new Error('Failed to retrieve monthly expenses');
        }
    }

    // Retrieve monthly summary by month and year
    static async getMonthlySummary(month, year) {
        if (!month || !year) {
            throw new Error('Month and year are required');
        }

        try {
            return await new Promise((resolve, reject) => {
                Expense.getMonthlySummaryByYear(month, year, (err, result) => {
                    if (err) reject(err);
                    resolve(result.length > 0 ? result[0] : null);
                });
            });
        } catch (error) {
            throw new Error('Failed to retrieve monthly summary');
        }
    }

    // Create a new expense
    static async createExpense(description, amount, date) {
        if (!description || !amount || !date) {
            throw new Error('Invalid data: Description, amount, and date are required');
        }

        try {
            // Insert expense
            const result = await new Promise((resolve, reject) => {
                Expense.create(description, amount, date, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

            // get expense by insertId
            const newExpense = await new Promise((resolve, reject) => {
                Expense.getById(result.insertId, (err, result) => {
                    if (err) reject(err);
                    resolve(result.length > 0 ? result[0] : null);
                });
            });

            return newExpense;
        } catch (error) {
            throw new Error('Failed to create expense');
        }
    }

    // Create multiple expenses
    static async createMultipleExpenses(expenses) {
        if (!Array.isArray(expenses) || expenses.length === 0) {
            throw new Error('Invalid data: A valid array of expenses is required');
        }

        const isValid = expenses.every(expense => expense.description && expense.amount && expense.date);
        if (!isValid) {
            throw new Error('Invalid data: All expenses must have description, amount, and date');
        }

        return new Promise((resolve, reject) => {
            Expense.createMultiple(expenses, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    // Update an expense by ID
    static async updateExpense(id, description, amount, date) {
        if (!id || !description || !amount || !date) {
            throw new Error('ID, description, amount, and date are required');
        }

        try {
            // Perform the update
            await new Promise((resolve, reject) => {
                Expense.update(id, description, amount, date, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });

            // Retrieve the updated expense
            const updatedExpense = await new Promise((resolve, reject) => {
                Expense.getById(id, (err, result) => {
                    if (err) reject(err);
                    resolve(result.length > 0 ? result[0] : null);
                });
            });

            return updatedExpense;
        } catch (error) {
            throw new Error('Failed to update expense');
        }
    }

    // Delete an expense by ID
    static async deleteExpense(id) {
        return new Promise((resolve, reject) => {
            Expense.delete(id, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

module.exports = ExpenseService;
