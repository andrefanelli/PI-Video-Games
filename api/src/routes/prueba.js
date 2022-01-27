const { Router } = require('express');
const { Op } = require('sequelize');
const axios = require('axios');
const { Videogame, Genre } = require('../db.js');
const { json } = require('body-parser');
const router = Router();
const { YOUR_API_KEY } = process.env;




const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=aefd01f1d1274e8aa26763bcf96aa1b0`);
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
    console.log(apiInfo)
}
getDbInfo()





router.get('/videogame', async (req, res) => {
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
