# Personal Expense API

RESTful API for managing personal expenses, built with Node.js, Express, and MySQL. Allows categorizing expenses, distinguishing between fixed and variable expenses, and managing installment payments. Includes user authentication with JWT and profile management.

## Project Structure

```
expense-api/
├── src/
│   ├── modules/
│   │   ├── expenses/
│   │   │   ├── expense.controller.js
│   │   │   ├── expense.service.js
│   │   │   ├── expense.model.js
│   │   │   ├── expense.routes.js
│   │   │   └── expense.validation.js
│   │   ├── categories/
│   │   │   ├── category.controller.js
│   │   │   ├── category.service.js
│   │   │   ├── category.model.js
│   │   │   ├── category.routes.js
│   │   │   └── category.validation.js
│   │   └── auth/
│   │       ├── auth.controller.js
│   │       ├── auth.service.js
│   │       ├── auth.routes.js
│   │       ├── auth.validation.js
│   │       └── user.model.js
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   ├── swaggerConfig.js
│   │   └── constants.js
│   ├── database/
│   │   └── migrations/
│   │       ├── alter_expenses_table.sql
│   │       ├── create_users_table.sql
│   │       └── update_users_add_profile_image.sql
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   ├── app.js
│   └── server.js
├── uploads/
│   └── profiles/
├── .env
├── README.md
└── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/expense-api.git
   cd expense-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=expenses_db
   DB_PORT=3306
   NODE_ENV=development
   JWT_SECRET=your-super-secret-key
   JWT_EXPIRES_IN=24h
   ```

4. Create the database in MySQL:

### Users

```sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255) DEFAULT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Categories

```sql
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Expenses

```sql
CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    category_id INT,
    user_id INT,
    is_fixed BOOLEAN DEFAULT FALSE,
    is_installment BOOLEAN DEFAULT FALSE,
    total_installments INT DEFAULT NULL,
    current_installment INT DEFAULT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
;
```

### Create Index

```sql
CREATE INDEX idx_expenses_category ON expenses (category_id);
CREATE INDEX idx_expenses_date ON expenses (date);
CREATE INDEX idx_expenses_is_fixed ON expenses (is_fixed);
CREATE INDEX idx_expenses_is_installment ON expenses (is_installment);
CREATE INDEX idx_expenses_user_id ON expenses (user_id);
```

## Features

### Expense Categories

- Complete category management (CRUD)
- Categorization for all expenses
- Category-based reporting

### Fixed vs. Variable Expenses

- Mark expenses as fixed or variable
- Filtering and separate reports by type
- Analysis of distribution between fixed and variable expenses

### Installment Expenses

- Record expenses paid in multiple installments
- Track current and total installments
- Filter installment expenses

### Enhanced Reporting

- Monthly reports with category distribution
- Fixed vs. variable expense analysis
- Installment expense tracking

### User Authentication

- JWT-based authentication
- User registration and login
- Password hashing with bcrypt
- Role-based authorization (admin/user)

### User Profiles

- Profile image upload and management
- User profile information
- Secure password changes

## Running the Application

### Development

```
npm run dev
```

### Production

```
npm start
```

## API Documentation

Swagger documentation is available at:

```
http://localhost:3000/api-docs
```

## Endpoints

### Expenses

- `GET /api/expenses` - Get all expenses
- `GET /api/expense/:id` - Get an expense by ID
- `GET /api/expenses/:month/:year` - Get expenses by month and year
- `GET /api/expenses/summary/:month/:year` - Get expense summary by month and year
- `GET /api/expenses/categories/:month/:year` - Get category summary
- `GET /api/expenses/report/:month/:year` - Get complete monthly report
- `GET /api/expenses/fixed/all` - Get all fixed expenses
- `GET /api/expenses/installment/all` - Get all installment expenses
- `POST /api/expense` - Create a new expense
- `POST /api/expenses` - Create multiple expenses
- `PUT /api/expense/:id` - Update an expense by ID
- `DELETE /api/expense/:id` - Delete an expense by ID

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/category/:id` - Get a category by ID
- `POST /api/category` - Create a new category
- `PUT /api/category/:id` - Update a category by ID
- `DELETE /api/category/:id` - Delete a category by ID

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/change-password` - Change user password
- `POST /api/auth/profile/image` - Update user profile image


## Usage Examples

### Creating a Fixed Expense

```json
POST /api/expense
{
  "description": "Netflix Subscription",
  "amount": 15.99,
  "date": "2023-05-01",
  "category_id": 4,
  "is_fixed": true,
  "notes": "Monthly subscription payment"
}
```

### Creating an Installment Expense

```json
POST /api/expense
{
  "description": "New Laptop",
  "amount": 300,
  "date": "2023-05-15",
  "category_id": 6,
  "is_installment": true,
  "total_installments": 6,
  "current_installment": 1,
  "notes": "First installment of laptop payment"
}
```

### User Registration

```json
POST /api/auth/register
Content-Type: multipart/form-data

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword",
  "profileImage": [file]
}
```

### User Login

```json
POST /api/auth/login
{
  "username": "johndoe",
  "password": "securepassword"
}
```

### Update Profile Image

```json
POST /api/auth/profile/image
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data

{
  "profileImage": [file]
}
```

### Getting Monthly Report

```
GET /api/expenses/report/5/2023
Authorization: Bearer <your-jwt-token>
```

## License

ISC
