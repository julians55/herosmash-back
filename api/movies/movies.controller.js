const {
    getAllMovies,
    getMovieById,
    patchMovies,
    createMovie,
    getFirstTenMovies
} = require("./movies.service");

const handlerAllMovies = async (req, res) => {
    const movies = await getAllMovies();
    console.log(movies);
    if(!movies){
        res.status(405).json("Movies not found");
    } else {
        res.json(movies);
    }
}
const handlerTenMovies = async (req, res) => {
    const movies = await getFirstTenMovies();
    console.log(movies);
    if(!movies){
        res.status(405).json("Movies not found");
    } else {
        res.json(movies);
    }
}
const handlerCreateMovie = async(req, res) => {
    try{
        const { body } = req;
        const movie = await createMovie(body);
        if(!movie){
            return res.status(404).json({message: 'error'});
        }else{
            res.status(201).json({message: 'Movie created'});
        }
    }catch(error){
        res.status(500).json(error);
    }
}
const handlerUpdateMovie = async(req, res) => {
    try{
        const movieWinner = await getMovieById(req.body.winner);
        const movieLoser = await getMovieById(req.body.loser);
        
        if(!movieWinner || !movieLoser){
            return res.status(404).json({message: 'error'});
        }
        const k = 40;
        const estimatedWinner = movieWinner[0].elo + k * (1 - (1/((1 + Math.pow(10, (movieLoser[0].elo - movieWinner[0].elo) / 400)))));
        const estimatedLoser = movieLoser[0].elo + k * (0 -  (1/((1 + Math.pow(10, (movieWinner[0].elo - movieLoser[0].elo) / 400)))));
        console.log(`estimatedWinner: ${estimatedWinner}, previousWinner: ${movieWinner[0].elo}, estimatedLoser: ${estimatedLoser}, previousLoser: ${movieLoser[0].elo}`);
        await patchMovies(req.body.winner, {elo: estimatedWinner});
        await patchMovies(req.body.loser, {elo: estimatedLoser});
        res.json("Movie updated");
    }catch(error){
        res.status(500).json(error);
    }
}
module.exports = {
    handlerAllMovies,
    handlerCreateMovie,
    handlerUpdateMovie,
    handlerTenMovies
  }