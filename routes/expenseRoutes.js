// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Define the routes

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Retrieve all expenses
 *     description: Retrieve a list of all expenses in the database.
 *     responses:
 *       200:
 *         description: A list of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The expense ID.
 *                   description:
 *                     type: string
 *                     description: The expense description.
 *                   amount:
 *                     type: number
 *                     description: The expense amount.
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: The expense date.
 */
router.get('/expenses', expenseController.getAllExpenses); // Retrieve all expenses

/**
 * @swagger
 * /api/expense/{id}:
 *   get:
 *     summary: Retrieve an expense by ID
 *     description: Retrieve a single expense by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The expense ID.
 *     responses:
 *       200:
 *         description: The requested expense
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 description:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 date:
 *                   type: string
 *                   format: date
 *       404:
 *         description: Expense not found
 */
router.get('/expense/:id', expenseController.getExpenseById); // Retrieve an expense by ID

/**
 * @swagger
 * /expense:
 *   post:
 *     summary: Create a new expense
 *     description: Add a new expense to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - amount
 *               - date
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Expense created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 expense:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     date:
 *                       type: string
 *                       format: date
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Server error.
 */
router.post('/expense', expenseController.createExpense);

/**
 * @swagger
 * /expense/{id}:
 *   put:
 *     summary: Update an expense by ID
 *     description: Update the details of an expense by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the expense to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - amount
 *               - date
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Expense updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 expense:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     description:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     date:
 *                       type: string
 *                       format: date
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Server error.
 */
router.put('/expense/:id', expenseController.updateExpense);

/**
 * @swagger
 * /expense/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     description: Remove an expense from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the expense to delete.
 *     responses:
 *       200:
 *         description: Expense deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Expense not found.
 *       500:
 *         description: Server error.
 */
router.delete('/expense/:id', expenseController.deleteExpense);

/**
 * @swagger
 * /api/expenses/month/{month}/year/{year}:
 *   get:
 *     summary: Retrieve expenses by month and year
 *     description: Retrieve expenses filtered by a specific month and year.
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *         description: The month (1-12).
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year (e.g., 2023).
 *     responses:
 *       200:
 *         description: A list of expenses for the specified month and year
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Invalid parameters
 */
router.get('/expenses/month/:month/year/:year', expenseController.getExpensesByMonth); // Retrieve expenses by month and year

/**
 * @swagger
 * /api/expenses/summary/month/{month}/year/{year}:
 *   get:
 *     summary: Retrieve monthly summary
 *     description: Retrieve a summary of expenses for a specific month and year.
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *         description: The month (1-12).
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year (e.g., 2023).
 *     responses:
 *       200:
 *         description: The monthly summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalExpenses:
 *                   type: integer
 *                 totalAmount:
 *                   type: number
 *                 averageAmount:
 *                   type: number
 *       400:
 *         description: Invalid parameters
 */
router.get('/expenses/summary/month/:month/year/:year', expenseController.getMonthlySummary); // Retrieve monthly summary by month and year

/**
 * @swagger
 * /bulk:
 *   post:
 *     summary: Create multiple expenses
 *     description: Add multiple expenses to the database in a single request.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - description
 *                 - amount
 *                 - date
 *               properties:
 *                 description:
 *                   type: string
 *                   description: Description of the expense.
 *                 amount:
 *                   type: number
 *                   description: Amount of the expense.
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: Date of the expense.
 *     responses:
 *       201:
 *         description: Expenses successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 insertedRows:
 *                   type: integer
 *                   description: Number of expenses created.
 *       400:
 *         description: Invalid input data. Ensure all required fields are present for each expense.
 *       500:
 *         description: Server error.
 */
router.post('/bulk', expenseController.createMultipleExpenses);

module.exports = router;