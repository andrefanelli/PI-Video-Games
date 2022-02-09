import React from "react";
import { Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetails } from '../actions/index.js';
import { useEffect } from "react";
import './details.css'


export default function Details(){
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetails(id));   
    },[id, dispatch]);

    const detail = useSelector((state) => state.detail);

    function handleReset() {
        dispatch(getDetails());
    }

    return (
        <div>
            <Link to={'/home'} onClick={handleReset}>
                <button className="button">HOME</button>
                </Link>
          
                <div>
                <h1 className="title">Title: {detail.name}</h1>
                <img src = {detail.background_image } alt='not found'/>
                <p>Released: {detail.released}</p>
                <p>
                    Platforms: 
                    {detail.id?.length > 7 
                     ? detail.platforms?.map(p => p.name).join(" - ")
                     : detail.platforms?.map(p => p.platform.name).join(" - ")}
                </p>
                <p>Genres: {detail.genres?.map(g => g.name).join("-")}</p>
                <p>Rating: {detail.rating}</p>
                <p>Description: {detail.description || detail.description_raw}</p>
                </div>
             
            
         </div>   

    
    )

}
