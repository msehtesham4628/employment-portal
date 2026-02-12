const sequelize = require('../database/db');
const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');

const seedData = async () => {
    try { 
        await sequelize.sync({ force: true });
        console.log('Database  synced...');

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('password123',salt);

        await User.create({
            username: 'admin',
            password: passwordHash,
            role: 'admin'
        });
        console.log('Admin user seeded (admin/password123)...');

        const employees = [
            { 
                name: ' Alice Johnson',
                email: 'alice.johnson@example.com',
                position: 'software Engineer',
                department: 'Development',
                dateOfjoining: '2023-01015',
                salary:75000   
            },
            {
                name: 'Bob Smith',
                email: 'bob.smith@example.com',
                position: 'Project Manager',
                department: 'Management',
                dateOfjoining: '2022-06-20',
            },
            {
                name: 'Carol Williams',
                email: 'carol.williams@example.com',
                position: 'HR Manager',
                department: 'Human Resources',
                dateOfjoining: '2021-09-10',
                salary: 85000
            }
        ];

        await Employee.bulkCreate(employees);
        console.log('Employees seeded...');

        process.exit();
    }catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
