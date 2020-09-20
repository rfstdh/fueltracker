import { ADD_TO_DATABASE, FETCH_FROM_DATABASE } from "../actions/dbActions";

const initialState = {
    fills: []
}

const dbRedcuer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FROM_DATABASE:
            console.log(action.type)
        return{
                ...state,
                fills: action.fillsArray
            }
    
        default:
           return state;
    }
}


export default dbRedcuer;