const mongoose = require('mongoose');
const loginSchema = mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true    
    },
    token:{
        type?: String
    }
},
{
    timeStamps: true
});

module.exports = mongoose.model('login', loginSchema)