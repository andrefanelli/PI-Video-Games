const { default: axios } = require('axios');
const { Router } = require('express');
const { Genre } = require('../db');
const { YOUR_API_KEY } = process.env;



const router = Router();

router.get('/', async (req, res) => {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`);
    const genres = genresApi.data.results
    
    genres.forEach(async (genre) => {
        await Genre.findOrCreate({
            where: {
                name: genre.name,
            }
        })
    });
    const allGenres = await Genre.findAll();
    res.status(200).send(allGenres);
})


/*
router.get('/', async (req, res, next) => {
    try {
        const gender = await Gender.findAll()
        res.send(gender)  
    } catch(error) {
        next(error)
    }   
})
*/
router.post('/', (req, res, next) => {
    const {name} = req.body
    return Genre.create({name})
    .then((newGenreNew) => {
    res.status(201).send(newGenreNew) //201 mensaje creado con exito, es opcional
  })
   .catch(error => next(error))
})

/*
router.put('/', (req, res, next) => {
    res.send('soy put/gender')
})

router.delete('/', (req, res, next) => {
    res.send('soy delete/gender')
})

*/
module.exports = router;
