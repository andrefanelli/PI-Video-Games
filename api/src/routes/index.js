const { Router } = require('express');
const genreRoute = require('./genre');
const videogameRoute = require('./videogame');
const platformRoute = require('./platforms')



const router = Router();

router.use('/genre', genreRoute); //middelware quiere decir que en la ruta /gender use genderRoute
router.use('/videogame', videogameRoute);
router.use('/platforms', platformRoute);


//router.get('/', (req, res, next)=> {
//    res.send('Soy el get de /Videogame')
//  });




module.exports = router;
