import {ADD_FILE_DATA, ADD_RED_FILE_DATA, ADD_GREEN_FILE_DATA, ADD_YELLOW_FILE_DATA} from '../actions/fileActions';

const initialState = {
    allFileData:[],
    fileRedData:[],
    fileGreenData:[],
    fileYellowData:[]
}

const fileReducer = (state=initialState, action) => {
    switch(action.type){
        case ADD_FILE_DATA:
            return{
                ...state,
                allFileData: action.fileData
            } 
        case ADD_RED_FILE_DATA:
            return{
                ...state,
                fileRedData: action.redFileData
            } 
        case ADD_GREEN_FILE_DATA:
            return{
                ...state,
                fileGreenData: action.greenFileData
            } 
        case ADD_YELLOW_FILE_DATA:
            return{
                ...state,
                fileYellowData: action.yellowFileData
            } 
    }
  
    return state;
}


export default fileReducer;