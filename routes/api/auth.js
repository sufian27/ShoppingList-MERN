const express = require('express');
const router = express.Router(); //create an express router
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

const User = require('../../models/User'); //import the Item model in order to make queries

/**
 * @route       POST api/auth
 * @description Auth user
 * @access      Public
 */
router.post('/', (req, res) => {
    const { password, email } = req.body;
    
    if(!password || !email) {
        res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    User
        .findOne({ email })
        .then(user => {
            if(!user) {
                res.status(400).json({
                    msg: 'User doesn\'t exists'
                });
            }
           
            //validate the password
            bcrypt
                .compare(password, user.password)   //compare plaintext and hashed password
                .then(match => {
                    if(!match) {
                        res.status(400).json({
                            msg: 'invalid credentials'
                        });
                    }

                    jwt.sign(           //make token
                        {               //this is the payload
                            id: user.id
                        },
                        config.get('jwtSecret'),
                        {
                            expiresIn: 3600
                        },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                } 
                             });
                        } 
                    )
                })
           
        })
});

/**
 * @route       GET api/auth/user
 * @description Get user data
 * @access      Private
 */
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => {
            res.json(user);
        });
});

module.exports = router;

