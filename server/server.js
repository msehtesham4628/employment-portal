const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const sequelize = require('./database/db');

sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync();
    })
    .catch(err => console.log('Error: ' + err));

    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/employees', require('./routes/employees'));

    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
    
