const { Router } = require('express');

const axios = require('axios');
const { Videogame, Genre } = require('../db');

const router = Router();
const { YOUR_API_KEY } = process.env;




const getApiInfo = async () => {
    const apiUrl = await axios.get(`http://api.rawg.io/api/games?key=${YOUR_API_KEY}`)
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

module.exports = router;