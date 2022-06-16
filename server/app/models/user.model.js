const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: 1
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
});

module.exports = mongoose.model('User', userSchema)
