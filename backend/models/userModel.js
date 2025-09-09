const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    "name" : String,
    "email" : String,
    "password" : String,
    "role" : {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
})