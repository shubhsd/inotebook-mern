const express = require('express');
const router = express.Router();

const User = require('../models/User');

// Create a user : using POST "/api/auth/"

router.post('/', (req, res) => {
    // Making new user 
    const user = User(req.body);
    user.save();
    res.send(req.body);
});

module.exports = router;