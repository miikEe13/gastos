# Expense Management API

This is a RESTful API for managing expenses. It supports CRUD operations and provides endpoints for retrieving expenses by month and year, as well as generating monthly summaries.

---

## 🚀 Features

- Retrieve all expenses
- Retrieve a single expense by ID
- Filter expenses by month and year
- Generate monthly summaries
- Create, update, and delete expenses
- Well-documented API with Swagger

---

## 🛠️ Installation

Follow these steps to set up the project locally:

1. Clone the repository:
2. Navigate to the project directory:
3. Install dependencies
   ```bash
    npm install
4. Running the API
    ```bash
    npm run dev
## 📚 API Documentation
The API documentation is available at:
   http://localhost:3000/api-docs/
It includes detailed information about each endpoint, request parameters, and responses.
## 🛠️ Environment Variables
Create a .env file in the root directory and add the following variables:
   ```bash
    DB_HOST=your-database-host
    DB_USER=your-database-user
    DB_PASSWORD=your-database-password
    DB_NAME=your-database-name
    PORT=3000