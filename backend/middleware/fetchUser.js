const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Shubhamisagoodb$oy';

const fetchUser = (req, res, next) => {
    // next means jaise hi middleware call ho jaye uske baad next middleware/func call hojaye in our case auth.js file mein getUser api ke andar after calling fetch user our async await function will be called.

    // Purpose of creating this middleware is wherever we have routes where login/auth token is required we will call this fetch user middleware there.

    // Only thing we have to do is that once we give our route then second parameter should be this function middleware

    // GET THE USER FROM JWT TOKEN AND ID TO REQUEST OBJECT

    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ error: 'Invalid token' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

module.exports = fetchUser;