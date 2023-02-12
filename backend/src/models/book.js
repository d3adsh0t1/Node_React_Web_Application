const mongoose = require('mongoose')

// Model schema for Book database
const Book = mongoose.model('Book',{
    name:{
        required:true,
        type: String,
        trim:true
    },
    author:{
        required:true,
        type: String,
        trim:true
    },
    genre:{
        required:true,
        type: String,
        trim:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref :'User'
    },
    url:{
        required:true,
        type: String
    }
})


module.exports = Book