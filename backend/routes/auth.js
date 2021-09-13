const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const JWT_SECRET = 'Shubhamisagoodb$oy';

// Create a user : using POST "/api/auth/createUser" . No login required

router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    body('email', 'Enter a valid email').isEmail(),
], async(req, res) => {
    // Returns bad requests if there are errors 
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

        const salt = await bcrypt.genSalt(10);
        // Await added in both lines because these both methods are promise so until and unless these two promises are resolved we can't move further otherwise it will give error.
        const secPassword = await bcrypt.hash(req.body.password, salt);
        // Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        // Here sign is synchronously signed(this can be known when we hover our mouse on sign. Therefore we need not require to add await with this or before this like we have done above for bcrypt methods)
        // console.log(authToken);
        // res.json(user);
        res.json({ authToken });
        // below method will also send same response
        // res.json({ authToken: authToken });

    } catch (error) {
        console.log(error.message, '---------->>>>>>Error from auth.js fileF');
        res.status(500).send('Some error occured');
    }
});

module.exports = router;