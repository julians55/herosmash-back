const movie = require('./api/movies');

function routes(app){
    app.use('/api/movies', movie);
}

module.exports = routes;