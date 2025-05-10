const ExpenseModel = require('./expense.model');

class ExpenseService {
    // Get all expenses
    static async getAllExpenses() {
        return new Promise((resolve, reject) => {
            ExpenseModel.getAll((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Get all expenses for a specific user
    static async getExpensesByUser(userId) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        
        return new Promise((resolve, reject) => {
            ExpenseModel.getAllByUser(userId, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Get an expense by ID
    static async getExpenseById(id) {
        return new Promise((resolve, reject) => {
            ExpenseModel.getById(id, (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) {
                    return reject(new Error('Expense not found'));
                }
                resolve(result[0]);
            });
        });
    }

    // Get an expense by ID and user ID
    static async getExpenseByUserAndId(userId, id) {
        if (!userId || !id) {
            throw new Error('User ID and expense ID are required');
        }
        
        return new Promise((resolve, reject) => {
            ExpenseModel.getByIdAndUser(id, userId, (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) {
                    return reject(new Error('Expense not found or does not belong to the user'));
                }
                resolve(result[0]);
            });
        });
    }

    // Retrieve expenses by month and year
    static async getExpensesByMonth(month, year) {
        if (!month || !year) {
            throw new Error('Month and year are required');
        }

        return new Promise((resolve, reject) => {
            ExpenseModel.getByMonthAndYear(month, year, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Retrieve expenses by month, year and user
    static async getExpensesByMonthAndUser(month, year, userId) {
        if (!month || !year || !userId) {
            throw new Error('Month, year and user ID are required');
        }

        return new Promise((resolve, reject) => {
            ExpenseModel.getByMonthYearAndUser(month, year, userId, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Retrieve monthly summary by month and year
    static async getMonthlySummary(month, year) {
        if (!month || !year) {
            throw new Error('Month and year are required');
        }

        return new Promise((resolve, reject) => {
            ExpenseModel.getMonthlySummaryByYear(month, year, (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0 ? result[0] : null);
            });
        });
    }

    // Retrieve monthly summary by month, year and user
    static async getMonthlySummaryByUser(month, year, userId) {
        if (!month || !year || !userId) {
            throw new Error('Month, year and user ID are required');
        }

        return new Promise((resolve, reject) => {
            ExpenseModel.getMonthlySummaryByYearAndUser(month, year, userId, (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0 ? result[0] : null);
            });
        });
    }

    // Get category summary for month and year
    static async getCategorySummary(month, year) {
        if (!month || !year) {
            throw new Error('Month and year are required');
        }

        return new Promise((resolve, reject) => {
            ExpenseModel.getCategorySummary(month, year, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Get category summary for month, year and user
    static async getCategorySummaryByUser(month, year, userId) {
        if (!month || !year || !userId) {
            throw new Error('Month, year and user ID are required');
        }

        return new Promise((resolve, reject) => {
            ExpenseModel.getCategorySummaryByUser(month, year, userId, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Get all fixed expenses
    static async getFixedExpenses() {
        return new Promise((resolve, reject) => {
            ExpenseModel.getFixedExpenses((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Get all fixed expenses for a user
    static async getFixedExpensesByUser(userId) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        
        return new Promise((resolve, reject) => {
            ExpenseModel.getFixedExpensesByUser(userId, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Get all installment expenses
    static async getInstallmentExpenses() {
        return new Promise((resolve, reject) => {
            ExpenseModel.getInstallmentExpenses((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Get all installment expenses for a user
    static async getInstallmentExpensesByUser(userId) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        
        return new Promise((resolve, reject) => {
            ExpenseModel.getInstallmentExpensesByUser(userId, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Create a new expense
    static async createExpense(expenseData) {
        if (!expenseData.description || !expenseData.amount || !expenseData.date || !expenseData.user_id) {
            throw new Error('Invalid data: Description, amount, date, and user_id are required');
        }

        try {
            // Insert expense
            const insertResult = await new Promise((resolve, reject) => {
                ExpenseModel.create(expenseData, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            // Get the newly created expense
            return this.getExpenseById(insertResult.insertId);
        } catch (error) {
            throw new Error(`Failed to create expense: ${error.message}`);
        }
    }

    // Create multiple expenses
    static async createMultipleExpenses(expenses) {
        if (!Array.isArray(expenses) || expenses.length === 0) {
            throw new Error('Invalid data: A valid array of expenses is required');
        }

        const isValid = expenses.every(expense => 
            expense.description && expense.amount && expense.date && expense.user_id
        );
        if (!isValid) {
            throw new Error('Invalid data: All expenses must have description, amount, date, and user_id');
        }

        return new Promise((resolve, reject) => {
            ExpenseModel.createMultiple(expenses, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    // Update an expense by ID
    static async updateExpense(id, expenseData) {
        if (!id || !expenseData.description || !expenseData.amount || !expenseData.date) {
            throw new Error('ID, description, amount, and date are required');
        }

        try {
            // Check if expense exists
            await this.getExpenseById(id);

            // Perform the update
            await new Promise((resolve, reject) => {
                ExpenseModel.update(id, expenseData, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            // Return the updated expense
            return this.getExpenseById(id);
        } catch (error) {
            throw new Error(`Failed to update expense: ${error.message}`);
        }
    }

    // Update an expense by ID and user ID
    static async updateExpenseByUser(id, userId, expenseData) {
        if (!id || !userId || !expenseData.description || !expenseData.amount || !expenseData.date) {
            throw new Error('ID, user ID, description, amount, and date are required');
        }

        try {
            // Check if expense exists and belongs to the user
            await this.getExpenseByUserAndId(userId, id);

            // Perform the update
            await new Promise((resolve, reject) => {
                ExpenseModel.updateByUser(id, userId, expenseData, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            // Return the updated expense
            return this.getExpenseByUserAndId(userId, id);
        } catch (error) {
            throw new Error(`Failed to update expense: ${error.message}`);
        }
    }

    // Delete an expense by ID
    static async deleteExpense(id) {
        try {
            // Check if expense exists
            await this.getExpenseById(id);

            // Delete the expense
            return new Promise((resolve, reject) => {
                ExpenseModel.delete(id, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        } catch (error) {
            throw new Error(`Failed to delete expense: ${error.message}`);
        }
    }

    // Delete an expense by ID and user ID
    static async deleteExpenseByUser(id, userId) {
        if (!id || !userId) {
            throw new Error('ID and user ID are required');
        }
        
        try {
            // Check if expense exists and belongs to the user
            await this.getExpenseByUserAndId(userId, id);

            // Delete the expense
            return new Promise((resolve, reject) => {
                ExpenseModel.deleteByUser(id, userId, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        } catch (error) {
            throw new Error(`Failed to delete expense: ${error.message}`);
        }
    }

    // Get monthly report
    static async getMonthlyReport(month, year) {
        if (!month || !year) {
            throw new Error('Month and year are required');
        }

        try {
            const [summary, categoryData, expenses] = await Promise.all([
                this.getMonthlySummary(month, year),
                this.getCategorySummary(month, year),
                this.getExpensesByMonth(month, year)
            ]);

            // Organizando los gastos
            const fixedExpenses = expenses.filter(e => e.is_fixed);
            const variableExpenses = expenses.filter(e => !e.is_fixed && !e.is_installment);
            const installmentExpenses = expenses.filter(e => e.is_installment);

            return {
                summary,
                categories: categoryData,
                expenses: {
                    all: expenses,
                    fixed: fixedExpenses,
                    variable: variableExpenses,
                    installment: installmentExpenses
                }
            };
        } catch (error) {
            throw new Error(`Failed to generate monthly report: ${error.message}`);
        }
    }

    // Get monthly report for a user
    static async getMonthlyReportByUser(month, year, userId) {
        if (!month || !year || !userId) {
            throw new Error('Month, year and user ID are required');
        }

        try {
            const [summary, categoryData, expenses] = await Promise.all([
                this.getMonthlySummaryByUser(month, year, userId),
                this.getCategorySummaryByUser(month, year, userId),
                this.getExpensesByMonthAndUser(month, year, userId)
            ]);

            // Organizando los gastos
            const fixedExpenses = expenses.filter(e => e.is_fixed);
            const variableExpenses = expenses.filter(e => !e.is_fixed && !e.is_installment);
            const installmentExpenses = expenses.filter(e => e.is_installment);

            return {
                summary,
                categories: categoryData,
                expenses: {
                    all: expenses,
                    fixed: fixedExpenses,
                    variable: variableExpenses,
                    installment: installmentExpenses
                }
            };
        } catch (error) {
            throw new Error(`Failed to generate monthly report: ${error.message}`);
        }
    }
}

module.exports = ExpenseService; 