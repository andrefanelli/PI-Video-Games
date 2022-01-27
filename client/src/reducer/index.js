
const initialState = {
    videogames = []

}


function rootReducer(state= initialState, action){ // en esta accion mando todos los videogames al arrglo vacio
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload
            }
    }

    
}


export default rootReducer;