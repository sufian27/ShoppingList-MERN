const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/items'); //for the server to know, we need to import items.js
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const path = require('path');

const config = require('config');

const app = express(); //initialize an express app

app.use(express.json()); //use the app
 
//DB config - get the URI from config file
const db = config.get('mongoURI');

//Connect to mongoose
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((err) => {
        console.log(err)
    });


//Anything that goes to api/items/* should refer to this
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

//Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Set the port
const port = process.env.PORT || 5000; //the port is either the environment port or 5000

//Listen to that port by passing port and callback function
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

