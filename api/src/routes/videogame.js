const { Router } = require('express');
const { Op } = require('sequelize');
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { json } = require('body-parser');
const router = Router();
const { YOUR_API_KEY } = process.env;




const getApiInfo = async () => {
    const apiUrl = await axios.get(`http://api.rawg.io/api/games?key=aefd01f1d1274e8aa26763bcf96aa1b0`);
    const apiInfo = await apiUrl.data.results.map(el => {
        return {
            id: el.id,
            image: el.background_image,
            name: el.name,
            genre: el.genres.map(el => el), //es un areglo, uso map para q me devuelvas varios generos
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Videogame.findAll({
     include: {
        model: Genre,
        attributes: ['name'],
        through: {
            attributes: [],
        },
      }
    })
}

const getAllVideogames = async () => {
    const apiInfo = await getApiInfo(); //llamo a getApInfo y la ejecuto
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}




router.get('/', async (req, res) => {
    const name = req.query.name
    let videogamesTotal = await getAllVideogames();
    if (name) {
        let videogameName = await videogamesTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))//fijate si el nombre coincide con el name que me pasan por query - el.name es el nombre del videogame
        videogameName.length? //encontraste algo acá?                                  //include me va a incluir el name donde sea, adelante, al medio , altras...
        res.status(200).send(videogameName) :
        res.status(404).send('No existe el video juego que buscas 😕');
    } else {
        res.status(200).send(videogamesTotal); // si no encuentra el query
    }   
})



router.get('/:id', async (req, res) => { // FUNCIONA !
    const { id } = req.params // const id = req.params.id   es lo mismo
    const videogamesTotal = await getAllVideogames() //reutilizo la fx de traer todos
    if (id) {
        let videogameId = await videogamesTotal.filter(el => el.id == id) //dentro de todos los videogames filtrame el que tiene el id que te estoy pasando
        videogameId.length?
        res.status(200).json(videogameId) : // si no , abajo(no encontro)
        res.status(404).send('No se encontró ese video juego 😕')
    }

})


router.post('/', async (req, res) => {
    let {
        name,
        description,
        released,
        rating,
        genres,
        platforms,
        createdInDb
    } = req.body

    let videogameCreated = await Videogame.create({
        name,
        description,
        released,
        rating,
        createdInDb
    })
    let genreDb = await Genre.findAll({
        where: {name : genres}
    })
    videogameCreated.addGenre(genreDb)
    res.send('Video juego creado con exito')
})    

//el next en las rutas va al sgte middleware y casualmente el sgte middleware es el control de errores
//router.get('/', (req, res, next) => { // con get me traigo o busco algo, videojuegos en este caso
//  return Videogame.findAll ({
//    include: Gender, 
//   })
//   .then((videogame) => {  // promesa que me va a retornar mis videogames
//    res.send(videogame)
//   })
//   .catch((error) => {   //.catch me va a agarrar todos los errores de sequelize . CONTROL CENTRALIZADO DE ERRORES
//        next(error)      //por eso usé next arriba. Ese catch me va a mostrar donde está el error mostrandome un
//                        //mensaje de error armado en app.js
//   })
//})


/*
router.post('/', async (req, res, next) => {  
    try {
        const {name, description, release, rating, platforms} = req.body;
        const newVideogameNew = await Videogame.create({
            name,
            description,
            release,
            rating,
            platforms
        
        })
          res.send(newVideogameNew) //name, description, release etc se envía aca, a newVideogameNew
        }  catch(error) {
            next(error)
        }
  })
})
*/

/*
router.post('/', (req, res, next) => {
    const {name, description, release, rating, platforms} = req.body
    return Videogame.create({name, description, release, rating, platforms})
    .then((newVideogameNew) => {
    res.status(201).send(newVideogameNew) //201 mensaje creado con exito, es opcional
  })
   .catch(error => next(error))
})
*/






/*
//para vincular un videojuego con un genero
router.post('/:videogameId/gender/:genderId', async (req, res, next) => {
    try{
        const {videogameId, genderId} = req.params;
        const videogame = await Videogame.findByPk(videogameId) // busco al videojuego por su primary key
        await videogame.addGender(genderId)                     //ligar los videojuegos con su genero en particular
        res.status(200)   //200 es OK
    } catch(error) {
        next(error)
    }    
})    
*/
    
router.put('/', (req, res, next) => {
    res.send('soy put/videogame')
})

router.delete('/', (req, res, next) => {
    res.send('soy delete/videogame')
})
/*
router.get('*', (req, res) => {
    res.status(404).json('No existe ninguna ruta con dicha url');
});
*/

module.exports = router;
