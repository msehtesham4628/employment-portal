const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {   
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).json({ message: 'user not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials'});

        const token = jwt.sign({ id: user.id }, 'secretkey_123', { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, username: user.username, role: user.role }});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});   

module.exports = router;