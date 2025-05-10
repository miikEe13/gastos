const CategoryModel = require('./category.model');

class CategoryService {
    // Get all categories
    static async getAllCategories() {
        return new Promise((resolve, reject) => {
            CategoryModel.getAll((err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Get a category by ID
    static async getCategoryById(id) {
        return new Promise((resolve, reject) => {
            CategoryModel.getById(id, (err, result) => {
                if (err) return reject(err);
                if (result.length === 0) {
                    return reject(new Error('Category not found'));
                }
                resolve(result[0]);
            });
        });
    }

    // Create a new category
    static async createCategory(name, description) {
        if (!name) {
            throw new Error('Category name is required');
        }

        try {
            // Insert category
            const insertResult = await new Promise((resolve, reject) => {
                CategoryModel.create(name, description || '', (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            // Get the newly created category
            return this.getCategoryById(insertResult.insertId);
        } catch (error) {
            throw new Error(`Failed to create category: ${error.message}`);
        }
    }

    // Update a category
    static async updateCategory(id, name, description) {
        if (!id || !name) {
            throw new Error('Category ID and name are required');
        }

        try {
            // Check if category exists
            await this.getCategoryById(id);

            // Perform the update
            await new Promise((resolve, reject) => {
                CategoryModel.update(id, name, description || '', (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            // Return the updated category
            return this.getCategoryById(id);
        } catch (error) {
            throw new Error(`Failed to update category: ${error.message}`);
        }
    }

    // Delete a category
    static async deleteCategory(id) {
        try {
            // Check if category exists
            await this.getCategoryById(id);

            // Check if the category is being used
            const expenseCount = await new Promise((resolve, reject) => {
                CategoryModel.getExpenseCount(id, (err, result) => {
                    if (err) return reject(err);
                    resolve(result[0].count);
                });
            });

            if (expenseCount > 0) {
                throw new Error(`Cannot delete category: it is used by ${expenseCount} expenses`);
            }

            // Delete the category
            return new Promise((resolve, reject) => {
                CategoryModel.delete(id, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        } catch (error) {
            throw new Error(`Failed to delete category: ${error.message}`);
        }
    }
}

module.exports = CategoryService; 