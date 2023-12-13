const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: String,
        required: false,
        default: false
    },
    image: {
        type: Object,
        default: {},
    }
},
    {
        timestamps: true
    });


module.exports = mongoose.model("User", userSchema)