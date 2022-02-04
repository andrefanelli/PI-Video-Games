import React from 'react';
import { Link } from "react-router-dom";


export default function Card ({name, image, genres, id, rating}) { //no necesito traerme ningun estado xq hago la logica en home.jsx
    let genre = genres.map((e) => e.name);

    return (
        <div>
            <Link to={'/videogame/' + id}>
            <img src={image} alt='not found' width='300px' height='250px'/>
            <div><h4>{name}</h4></div>
            <div><h6>{genre.join('-')}</h6></div>
            <div><h6>{rating}</h6></div>
            </Link>

        </div>
    );
}