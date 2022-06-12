const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title:{
        type: String,
        require: false
    },
    releaseDate:{
        type: String,
        require: false
    },
    director:{
        type: String,
        require: false
    },
    cast:{
        type: String,
        require: false
    },
    imdb:{
        type: String,
        require: false
    },
    movieId: Number,
    elo:{
        type: Number,
        default: 800,
        require: true
    },
    image: {
        type: String,
        require: false
    },
})

const movies = mongoose.model('Movie', MovieSchema);
module.exports = movies;