const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// Create a user : using POST "/api/auth/"

router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    body('email', 'Enter a valid email').isEmail(),
], (req, res) => {
    // Making new user 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(user => res.json(user))
        .catch((error) => {
            res.json({ error: 'Please enter a unique value for email', message: error.message });
        });
});

module.exports = router;