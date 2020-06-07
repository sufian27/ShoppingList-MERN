const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema of an item
const UserSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now     
    }
});

//sxport a variable called Item which is a mongoose model
//The mongoose model takes in a name and a schema type object
module.exports = User = mongoose.model('user', UserSchema);