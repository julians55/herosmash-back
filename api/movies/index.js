const { Router } = require('express');
const {
    handlerAllMovies,
    handlerUpdateMovie,
    handlerCreateMovie,
    handlerTenMovies
} = require('./movies.controller');

const router = Router();

router.get('/', handlerAllMovies);
router.get('/ten', handlerTenMovies);
router.post('/', handlerCreateMovie);
router.patch('/', handlerUpdateMovie);

module.exports = router;