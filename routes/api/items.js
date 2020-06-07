const express = require('express');
const router = express.Router(); //create an express router
const auth = require('../../middleware/auth');

const Item = require('../../models/Item'); //import the Item model in order to make queries

/**
 * @route       GET api/items
 * @description Get all items
 * @access      Public
 */
router.get('/', (req, res) => {
    Item.find() 
        .sort({ 
            date: -1 //sort in ascending order of date
        }) 
        .then((items) =>  {
            res.json(items) //jsonify the data
        });
});

/**
 * @route       POST api/items
 * @description Add item
 * @access      Private
 */
router.post('/', auth, (req, res) => {
    const newItem = new Item({ //create new item object
        name: req.body.name
    });
    
    newItem.save() //This will save the item in the database and just respond base with the same item
        .then((item) => {
            res.json(item) //just respond back
        }); 
});

/**
 * @route       DELETE api/items/:id
 * @description delete item
 * @access      Private
 */
router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id) //returns a promise which we can use to remove
        .then((item) => {
            item.remove() //this returns a promise too
                .then(() => {
                    res.json({
                        success: true
                    })
                })
        })
        .catch((err) => {
            res.status(404).json({
                success: false
            })
        });
});

module.exports = router;

