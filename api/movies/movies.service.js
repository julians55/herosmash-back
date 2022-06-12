const res = require('express/lib/response');
const MovieModel = require('./movies.model');

function randomizer(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
const getAllMovies = async() => {
    const number = await MovieModel.countDocuments();
    let id1 = randomizer(1, number);
    let id2 = randomizer(1, number);
    while(id2==id1){
        id2 = randomizer(1, number);
    }
    console.log(id1);
    console.log(id2);
    if(number == 0){
        console.log("Movies not found");
    }
    return await MovieModel.find({$or:[{movieId: id1},{movieId: id2}]});
}
const getFirstTenMovies = async() => {
    return await MovieModel.find({}).sort({elo: 'desc'});
}
const getMovieById = async(id) => {
    const movie = await MovieModel.find({movieId: id});
    if(!movie){
        return null;
    }
    return movie;
}
const createMovie = async (movie) => {
    return await MovieModel.create(movie);
}
const patchMovies = async (movieId, newElo) => {
    const movie1 = await MovieModel.find({movieId: movieId});
    
    if(!movie1){
        return null;
    }
    console.log("asdf");
    return await MovieModel.findOneAndUpdate({movieId: movieId}, newElo)
}
module.exports = {
    getMovieById,
    getAllMovies,
    createMovie,
    patchMovies,
    getFirstTenMovies
}