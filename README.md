Mini Employee Management Portal

This is a simple full-stack Employee Management application built for learning and internal use.
It allows an admin to log in, view employees, and perform basic CRUD operations.

The project is intentionally kept simple and easy to run locally.

Tech Stack
Frontend

React (Vite)

Tailwind CSS

Headless UI

Lucide React (icons)

Backend

Node.js

Express

Sequelize ORM

Database

SQLite (local file-based database)

Features
Authentication

Admin login using JWT

Credentials are seeded in the database

Dashboard

Shows total employees

Shows departments count

Shows recent hires

Employee Management

View all employees

Search employees by name or department

Add new employees

Edit employee details

Delete employees

Pagination handled on the client side for simplicity

Prerequisites

Node.js (version 16 or above)

npm

Backend Setup

Navigate to the server folder:

cd server


Install dependencies:

npm install


Seed the database (creates admin user and sample employees):

npm run seed


Start the backend server:

npm run dev


The backend will run on:

http://localhost:5000

Frontend Setup

Open a new terminal and go to the client folder:

cd client


Install dependencies:

npm install


Start the frontend:

npm run dev


The application will be available at:

http://localhost:5173

Login Credentials

Use the following credentials to log in:

Username: admin

Password: password123

Project Structure
/client
  /src
    /components   Reusable UI components
    /pages        Login, Dashboard, Employees
    /context      Authentication context

/server
  /routes         API routes
  /models         Sequelize models
  /database       SQLite database file

API Endpoints

Authentication:

POST /api/auth/login – Login and receive JWT

Employees:

GET /api/employees – Get all employees

POST /api/employees – Create a new employee

PUT /api/employees/:id – Update an employee

DELETE /api/employees/:id – Delete an employee

