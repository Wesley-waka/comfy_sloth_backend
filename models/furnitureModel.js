const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FurnitureSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    image: {
        type: Object,
        require: true,
        default: {}
    },
    featured: {
        type: Boolean,
        require: true
    },
    colors: {
        type: Array,
        require: true,
        default: []
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
        require: true
    },
    shipping: {
        type: Boolean,
        require: true
    },
    extra_images: {
        type: Array,
        default: []
    },
    stock:{
        type: Number,
        require: true
    },
    reviews:{
        type: Number,
        require: true
    },
    stars:{
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Furniture', FurnitureSchema)