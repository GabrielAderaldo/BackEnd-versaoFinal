const mongoose = require('../database')

const songSchema = new mongoose.Schema({
    id:{
        type: Number,
        require: true,
    },
    name:{
        type: String,
        require: true,
    },
    artist:{
        type: String,
        require: true,
    },
    path:{
        type: String,
        require: true,
    }
})

const Songs = mongoose.model('Songs',songSchema)

module.exports = Songs;