const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FurnitureSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    featured: {
        type: Boolean,
        require: true
    },
    color: {
        type: Enumerator,
        require: true
    },
    company: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true,
    },
    shipping: {
        type: Boolean,
        require: true
    }
})

module.exports = mongoose.model('Furniture', FurnitureSchema)