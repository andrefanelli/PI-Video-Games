import React, {useState, useEffect} from 'react';
//import {useHistory} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {postVideogame, getGenres} from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import './videogameCreate.css';



function validate(input){
    let errors = {};
    if(!input.name.trim()) {
        errors.name = 'Write a name, please';
    } 
    if(!input.description.trim()) {
        errors.description = 'Write a description, please';
    }
    if(!input.platforms.length) {
        errors.platforms = 'Select a platform, please';
    }
    return errors;
}

export default function VideogameCreate(){
    const dispatch = useDispatch();
 //   const history = useHistory();
    const genre = useSelector((state) => state.genres);
    const platform = useSelector((state) => state.platforms)
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        image:'',
        description: '',
        released: '',
        rating: '',
        genres: [],
        platforms: [],
    })


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value //name se refiere a cada casillero q tiene que llenar, por eso en el form aparece name en todos
        })                              // el value son los inputs de arriba que van a ir cambiando de valor a medida q la persona ingrse los datos
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log(input)
    }
 

    function handleSelectGenre(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value],
        })
    }

    function handleSelectPlatform(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postVideogame(input))
        alert('Videogame creado 👌')
        setInput({ //seteo todo mi input en cero
            name: '',
            image:'',
            description: '',
            released: '',
            rating: '',
            genres: [],
            platforms: [],
        })
   //     history.push('/home') //history push y llevame al home para ver si está creado el videojuego. Redirige
 }    

    function handleDeletePlatform(e){
        setInput({
            ...input,
            platforms: input.platforms.filter(p => p !==e),

        })
    }

    function handleDeleteGenre(e){
        setInput({
            ...input, //me traigo el estado anterior
            genres: input.genres.filter(g => g !==e), //filtrar por todo lo que NO sea ese elemento 

        })
    }

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);


    return(
        <>
        <div>
            <Link to= '/home'>Home</Link>
            
            <h1>¡Let's go!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name </label>
                    <input
                    type= 'text'
                    value= {input.name}
                    name= 'name'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Image </label>
                    <input
                    type= 'img'
                    value= {input.image}
                    name= 'image'
                    alt= 'not found'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Description </label>
                    <input
                    type= 'text'
                    value= {input.description}
                    name= 'description'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.description && (
                        <p className='error'>{errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Released </label>
                    <input
                    type= 'date'
                    value= {input.released}
                    name= 'released'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Rating </label>
                    <input
                    type= 'number'
                    value= {input.rating}
                    min={0}
                    max={5}
                    name= 'rating'
                    onChange={(e) => handleChange(e)}
                    />
                </div> 

                <p>Genres </p>
                <select className='select' onChange={(e) => handleSelectGenre(e)}>
                    {genre.map(g => (
                        <option key={g.name} value={g.name}>{g.name}</option>
                    ))}
                </select>

                <p>Platforms </p>
                <select className='select' onChange={(e) => handleSelectPlatform(e)}>
                    {platform.map(p => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                    ))}
                </select>

                <div>
                    <button type='submit'>Create</button>
                  
                </div>
            </form>
            {input.genres.map(g => 
                <div className='divGenre'>
                <p>{g}</p>
                <button className='botonX' onClick={() => handleDeleteGenre(g)}>X</button>  
                </div>  
            )}
            {input.platforms.map(p => 
                <div className='divPlatform'>
                <p>{p}</p>
                <button className='botonX' onClick={() => handleDeletePlatform(p)}>X</button>  
                </div>  
            )}
        </div>
    </>
  )
}    



