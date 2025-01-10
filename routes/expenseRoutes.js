// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Define the routes
router.get('/expenses', expenseController.getAllExpenses); // Retrieve all expenses
router.get('/expense/:id', expenseController.getExpenseById); // Retrieve an expense by ID
router.post('/expense', expenseController.createExpense); // Create a new expense
router.put('/expense/:id', expenseController.updateExpense); // Update an expense
router.delete('/expense/:id', expenseController.deleteExpense); // Delete an expense

router.get('/expenses/month/:month/year/:year', expenseController.getExpensesByMonth); // Retrieve expenses by month and year
router.get('/expenses/summary/month/:month/year/:year', expenseController.getMonthlySummary); // Retrieve monthly summary by month and year

router.post('/bulk', expenseController.createMultipleExpenses); // Create multiple expenses

module.exports = router;