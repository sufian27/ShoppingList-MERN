const express = require('express');
const router = express.Router(); //create an express router
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User'); //import the Item model in order to make queries

/**
 * @route       POST api/users
 * @description Register user
 * @access      Public
 */
router.post('/', (req, res) => {
    const { name, password, email } = req.body;
    
    if(!name || !password || !email) {
        res.status(400).json({
            msg: 'Please enter all fields'
        });
    }

    User
        .findOne({ email })
        .then(user => {
            if(user) {
                res.status(400).json({
                    msg: 'User already exists'
                });
            }
            const newUser = new User({
                name,
                email,
                password
            });

            //We will hash the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;    //set the password as the hashed password
                    newUser
                        .save()
                        .then(user => {

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
            })
        })
});

module.exports = router;

