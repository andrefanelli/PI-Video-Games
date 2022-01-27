import axios from 'axios';

//conexion entre front y back
export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/api/videogame')
        
            return dispatch({
            type: 'GET_VIDEOGAMES',
            paload: json.data

        })
    }

}