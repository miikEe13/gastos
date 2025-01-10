const ExpenseService = require('../services/expenseService');

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseService.getAllExpenses();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await ExpenseService.getExpenseById(id);
        res.json(expense);
    } catch (error) {
        res.status(error.message === 'Expense not found' ? 404 : 500).json({ error: error.message });
    }
};

exports.getExpensesByMonth = async (req, res) => {
    try {
        const { month, year } = req.params;
        const expenses = await ExpenseService.getExpensesByMonth(month, year);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMonthlySummary = async (req, res) => {
    try {
        const { month, year } = req.params;
        const summary = await ExpenseService.getMonthlySummary(month, year);
        res.json(summary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createExpense = async (req, res) => {
    try {
        const { description, amount, date } = req.body;
        const newExpense = await ExpenseService.createExpense(description, amount, date);
        res.status(201).json({
            message: 'Expense successfully created',
            expense: newExpense
        });
    } catch (error) {
        res.status(error.message.includes('required') ? 400 : 500).json({ error: error.message });
    }
};

exports.createMultipleExpenses = async (req, res) => {
    try {
        const expenses = req.body;
        const result = await ExpenseService.createMultipleExpenses(expenses);
        res.status(201).json({ message: 'Expenses successfully created', insertedRows: result.affectedRows });
    } catch (error) {
        res.status(error.message.includes('required') ? 400 : 500).json({ error: error.message });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, amount, date } = req.body;
        const updatedExpense = await ExpenseService.updateExpense(id, description, amount, date);
        res.json({
            message: 'Expense successfully updated',
            expense: updatedExpense
        });
    } catch (error) {
        res.status(error.message.includes('required') ? 400 : 500).json({ error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        await ExpenseService.deleteExpense(id);
        res.json({ message: 'Expense successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
