const express = require('express');
const router = express.Router();
const { body, checkSchema, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User'); //Importing user model here
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'Shubhamisagoodb$oy';

// ROUTE 1 : Create a user : using POST "/api/auth/createUser" . No login required

const registrationSchema = {
    password: {
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        },
        errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number and special character ",
    },
}

router.post('/createUser', checkSchema(registrationSchema), [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    body('email', 'Enter a valid email').isEmail(),
], async (req, res) => {
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
        console.log(error.message, '---------->>>>>>Error from auth.js file --- create user api');
        res.status(500).send('Internal server error');
    }
});

// ROUTE 2 : Authenticate a user : using POST "/api/auth/login" . No login required
router.post('/login', [
    body('email', 'Email is required').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // Returns bad requests if there are errors 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        // Check whether user with same email already exists or not
        // User - capital u this is our model.
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        // Compare is asynchronous method - checked after hovering so we will use await here and will return true or false - we got to know this on hovering it said it return promise<boolean>.
        // First password passed as argument above is what you user have entered- destructured above and 2nd argument i.e user.password is the one that we found using findOne query from the database.

        if (!passwordCompare) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        res.json({ authToken });

    } catch (error) {
        console.log(error.message, '---------->>>>>>Error from auth.js file ---- login api');
        res.status(500).send('Internal server error');
    }
});

// ROUTE 3 : Get logged in user details : using POST "/api/auth/getUser" . Login required
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        // .select('-password') means get all fields except password
        res.send(user);
    } catch (error) {
        console.log(error.message, '---------->>>>>>Error from auth.js file ---- getUSer api');
        res.status(500).send('Internal server error');
    }
});


module.exports = router;