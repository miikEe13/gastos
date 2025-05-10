const ExpenseService = require('./expense.service');

exports.getAllExpenses = async (req, res) => {
    try {
        // Si hay un usuario autenticado, obtener solo sus gastos
        if (req.user) {
            const expenses = await ExpenseService.getExpensesByUser(req.user.userId);
            return res.json(expenses);
        }
        // Solo administradores pueden ver todos los gastos
        const expenses = await ExpenseService.getAllExpenses();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Si hay un usuario autenticado, verificar que sea su gasto
        if (req.user && req.user.role !== 'admin') {
            const expense = await ExpenseService.getExpenseByUserAndId(req.user.userId, id);
            return res.json(expense);
        }
        
        const expense = await ExpenseService.getExpenseById(id);
        res.json(expense);
    } catch (error) {
        res.status(error.message === 'Expense not found' ? 404 : 500).json({ error: error.message });
    }
};

exports.getExpensesByMonth = async (req, res) => {
    try {
        const { month, year } = req.params;
        
        // Si hay un usuario autenticado, obtener solo sus gastos
        if (req.user && req.user.role !== 'admin') {
            const expenses = await ExpenseService.getExpensesByMonthAndUser(month, year, req.user.userId);
            return res.json(expenses);
        }
        
        const expenses = await ExpenseService.getExpensesByMonth(month, year);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMonthlySummary = async (req, res) => {
    try {
        const { month, year } = req.params;
        
        // Si hay un usuario autenticado, obtener solo su resumen
        if (req.user && req.user.role !== 'admin') {
            const summary = await ExpenseService.getMonthlySummaryByUser(month, year, req.user.userId);
            return res.json(summary);
        }
        
        const summary = await ExpenseService.getMonthlySummary(month, year);
        res.json(summary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategorySummary = async (req, res) => {
    try {
        const { month, year } = req.params;
        
        // Si hay un usuario autenticado, obtener solo su resumen por categorías
        if (req.user && req.user.role !== 'admin') {
            const categorySummary = await ExpenseService.getCategorySummaryByUser(month, year, req.user.userId);
            return res.json(categorySummary);
        }
        
        const categorySummary = await ExpenseService.getCategorySummary(month, year);
        res.json(categorySummary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFixedExpenses = async (req, res) => {
    try {
        // Si hay un usuario autenticado, obtener solo sus gastos fijos
        if (req.user && req.user.role !== 'admin') {
            const fixedExpenses = await ExpenseService.getFixedExpensesByUser(req.user.userId);
            return res.json(fixedExpenses);
        }
        
        const fixedExpenses = await ExpenseService.getFixedExpenses();
        res.json(fixedExpenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getInstallmentExpenses = async (req, res) => {
    try {
        // Si hay un usuario autenticado, obtener solo sus gastos a plazos
        if (req.user && req.user.role !== 'admin') {
            const installmentExpenses = await ExpenseService.getInstallmentExpensesByUser(req.user.userId);
            return res.json(installmentExpenses);
        }
        
        const installmentExpenses = await ExpenseService.getInstallmentExpenses();
        res.json(installmentExpenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMonthlyReport = async (req, res) => {
    try {
        const { month, year } = req.params;
        
        // Si hay un usuario autenticado, obtener solo su reporte mensual
        if (req.user && req.user.role !== 'admin') {
            const report = await ExpenseService.getMonthlyReportByUser(month, year, req.user.userId);
            return res.json(report);
        }
        
        const report = await ExpenseService.getMonthlyReport(month, year);
        res.json(report);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createExpense = async (req, res) => {
    try {
        // Añadir el ID del usuario al gasto
        const expenseData = {
            ...req.body,
            user_id: req.user.userId
        };
        
        const newExpense = await ExpenseService.createExpense(expenseData);
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
        // Añadir el ID del usuario a cada gasto
        const expenses = req.body.map(expense => ({
            ...expense,
            user_id: req.user.userId
        }));
        
        const result = await ExpenseService.createMultipleExpenses(expenses);
        res.status(201).json({ 
            message: 'Expenses successfully created', 
            insertedRows: result.affectedRows 
        });
    } catch (error) {
        res.status(error.message.includes('required') ? 400 : 500).json({ error: error.message });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Si hay un usuario autenticado que no es admin, verificar que sea su gasto
        if (req.user && req.user.role !== 'admin') {
            const updatedExpense = await ExpenseService.updateExpenseByUser(id, req.user.userId, req.body);
            return res.json({
                message: 'Expense successfully updated',
                expense: updatedExpense
            });
        }
        
        const updatedExpense = await ExpenseService.updateExpense(id, req.body);
        res.json({
            message: 'Expense successfully updated',
            expense: updatedExpense
        });
    } catch (error) {
        res.status(error.message.includes('not found') ? 404 : 
                 error.message.includes('required') ? 400 : 500).json({ error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Si hay un usuario autenticado que no es admin, verificar que sea su gasto
        if (req.user && req.user.role !== 'admin') {
            await ExpenseService.deleteExpenseByUser(id, req.user.userId);
            return res.json({ message: 'Expense successfully deleted' });
        }
        
        await ExpenseService.deleteExpense(id);
        res.json({ message: 'Expense successfully deleted' });
    } catch (error) {
        res.status(error.message.includes('not found') ? 404 : 500).json({ error: error.message });
    }
}; 