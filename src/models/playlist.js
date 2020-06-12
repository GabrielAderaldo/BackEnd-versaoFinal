const mongoose = require('../database')

const playlistSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        lowercase:true,
    },
    img:{
        type: String,
        require:true,
    },
    musicId:[{
        type: Number,
        require:true,
        unique:false
    }],
    nameURL:{
        type: String,
    }
})

const Playlist = mongoose.model('Playlist',playlistSchema)

module.exports = Playlist;