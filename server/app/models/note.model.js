const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: String,
    content: String
},
{
    timeStamps: true
});

module.exports = mongoose.model('Note', noteSchema)





