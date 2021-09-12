const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// Create a user : using POST "/api/auth/createUser" . No login required

router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    body('email', 'Enter a valid email').isEmail(),
], async(req, res) => {
    // Making new user 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // Check whether user with same email already exists or not
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json(user);
    } catch (error) {
        console.log(error.message, '---------->>>>>>Error from auth.js fileF');
        res.status(500).send('Some error occured');
    }
});

module.exports = router;