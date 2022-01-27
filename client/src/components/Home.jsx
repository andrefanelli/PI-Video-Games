import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getVideogames } from '../actions';
import { Link } from 'react-router-dom';


export default function Home(){  //este hook vendria a reemplazar al map state to prop

    const dispatch = useDispatch()
    const allVideogames = useSelector ((state) => state.videogames) //con useSelector hago q me traiga todo lo q está en el estado de videogame y lo guardo en esa constante

    //me traigo los videojuegos cdo el componente se monta
    useEffect (() => { //acá le paso la acción. arriba la declaré
        dispatch(getVideogames());
    }, []) //arreglo vacío xq no depende de nada, se monta tranquilo


    function handleClick(e){
    e.preventDefault();       //prevent default para q no rompa cdo recarga la pagina, o evita q recargue, no entendi bien
    dispatch(getVideogames());
    }
 }
    return (
        <div>
            <Link to= '/videogame'>Create videogame</Link>
            <h1>HOLIII PROBANDOO</h1>
            <button onClick={e => {handleClick(e)}}>  
                Load again all videogames    
            </button>
            <div>
                <select>
                    <option value='All'>Todos</option>  
                    <option value='Action'>Action</option>
                    <option value='Adventure'>Adventure</option>
                    <option value='Arcade'>Arcade</option>
                    <option value='Board Games'> Board Games</option>
                    <option value='Card'>Card</option>
                    <option value='Casual'>Casual</option>
                    <option value='Educational'>Educational</option>
                    <option value='Family'>Family</option>
                    <option value='Fighting'>Fighting</option>
                    <option value='Indie'>Indie</option>
                    <option value='Massively Multiplayer'>Massively Multiplayer</option>
                    <option value='Platformer'>Platformer</option>
                    <option value='Puzzle'>Puzzle</option>
                    <option value='Racing'>Racing</option>
                    <option value='RPG'>RPG</option>
                    <option value='Shooter'>Shooter</option>
                    <option value='Simulation'>Simulation</option>
                    <option value='Sports'>Sports</option>
                    <option value='Strategy'>Strategy</option>
                </select>

                <select>
                    <option value='All'>Todos</option>
                    <option value='Created'>Creados</option>
                    <option value='Api'>Existentes</option>
                </select>

                <select>
                    <option value='Asc'>Ascendente</option>
                    <option value='Desc'>Descendente</option>
                </select>
            </div>
        </div>
    )
 