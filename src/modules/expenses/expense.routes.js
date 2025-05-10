// src/modules/expenses/expense.routes.js
const express = require('express');
const router = express.Router();
const expenseController = require('./expense.controller');
const expenseValidation = require('./expense.validation');
const { authMiddleware, adminMiddleware } = require('../../middlewares/auth.middleware');
const { ENDPOINTS } = require('../../config/constants');

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management
 */

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expense'
 *       401:
 *         description: Unauthorized
 */
router.get('/expenses', authMiddleware, expenseController.getAllExpenses);

/**
 * @swagger
 * /api/expense/{id}:
 *   get:
 *     summary: Get an expense by ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       404:
 *         description: Expense not found
 *       401:
 *         description: Unauthorized
 */
router.get('/expense/:id', authMiddleware, expenseValidation.validateId, expenseController.getExpenseById);

/**
 * @swagger
 * /api/expense:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */
router.post('/expense', authMiddleware, expenseValidation.validateExpense, expenseController.createExpense);

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Create multiple expenses
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Expense'
 *     responses:
 *       201:
 *         description: Expenses created successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 */
router.post('/expenses', authMiddleware, expenseValidation.validateMultipleExpenses, expenseController.createMultipleExpenses);

/**
 * @swagger
 * /api/expense/{id}:
 *   put:
 *     summary: Update an expense by ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Expense ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Expense'
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Expense not found
 *       401:
 *         description: Unauthorized
 */
router.put('/expense/:id', authMiddleware, expenseValidation.validateId, expenseValidation.validateExpense, expenseController.updateExpense);

/**
 * @swagger
 * /api/expense/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/expense/:id', authMiddleware, expenseValidation.validateId, expenseController.deleteExpense);

/**
 * @swagger
 * /api/expenses/{month}/{year}:
 *   get:
 *     summary: Get expenses by month and year
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: month
 *         schema:
 *           type: integer
 *         required: true
 *         description: Month (1-12)
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year
 *     responses:
 *       200:
 *         description: List of expenses for the specified month and year
 *       401:
 *         description: Unauthorized
 */
router.get('/expenses/:month/:year', authMiddleware, expenseValidation.validateMonthYear, expenseController.getExpensesByMonth);

/**
 * @swagger
 * /api/expenses/summary/{month}/{year}:
 *   get:
 *     summary: Get expense summary by month and year
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: month
 *         schema:
 *           type: integer
 *         required: true
 *         description: Month (1-12)
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year
 *     responses:
 *       200:
 *         description: Summary of expenses for the specified month and year
 *       401:
 *         description: Unauthorized
 */
router.get('/expenses/summary/:month/:year', authMiddleware, expenseValidation.validateMonthYear, expenseController.getMonthlySummary);

/**
 * @swagger
 * /api/expenses/categories/{month}/{year}:
 *   get:
 *     summary: Get category summary by month and year
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: month
 *         schema:
 *           type: integer
 *         required: true
 *         description: Month (1-12)
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year
 *     responses:
 *       200:
 *         description: Category summary for the specified month and year
 *       401:
 *         description: Unauthorized
 */
router.get('/expenses/categories/:month/:year', authMiddleware, expenseValidation.validateMonthYear, expenseController.getCategorySummary);

/**
 * @swagger
 * /api/expenses/fixed/all:
 *   get:
 *     summary: Get all fixed expenses
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all fixed expenses
 *       401:
 *         description: Unauthorized
 */
router.get('/expenses/fixed/all', authMiddleware, expenseController.getFixedExpenses);

/**
 * @swagger
 * /api/expenses/installment/all:
 *   get:
 *     summary: Get all installment expenses
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all installment expenses
 *       401:
 *         description: Unauthorized
 */
router.get('/expenses/installment/all', authMiddleware, expenseController.getInstallmentExpenses);

/**
 * @swagger
 * /api/expenses/report/{month}/{year}:
 *   get:
 *     summary: Get complete monthly report
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: month
 *         schema:
 *           type: integer
 *         required: true
 *         description: Month (1-12)
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Year
 *     responses:
 *       200:
 *         description: Complete monthly report including summary, categories, and expense lists
 *       401:
 *         description: Unauthorized
 */
router.get('/expenses/report/:month/:year', authMiddleware, expenseValidation.validateMonthYear, expenseController.getMonthlyReport);

module.exports = router; 