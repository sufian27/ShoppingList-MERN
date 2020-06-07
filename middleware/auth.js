//Middleware created for access to private routes
const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    //Check if token exists
    if(!token) {
        return res.status(401).json({
            msg: 'Access denied, no token'
        });
    }

    try {
        //Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //Add User from payload
        req.user = decoded; //you can add anything to the request in the middleware
        next(); //calls the next middleware
    } catch(e) {
        res.status(400).json({
            msg: 'Token is not valid'
        });
    }
}

module.exports = auth;