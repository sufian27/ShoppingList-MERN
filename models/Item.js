const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema of an item
const ItemSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    date: {
        type: Date,
        default: Date.now     
    }
});

//sxport a variable called Item which is a mongoose model
//The mongoose model takes in a name and a schema type object
module.exports = Item = mongoose.model('item', ItemSchema);