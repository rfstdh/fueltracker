import {UPDATE_BLUR, SET_SCOPE, SET_BLUR_VALUE, SET_FILL_DATE, SET_TRACK_TYPE} from '../actions/fillActions';

const initialState = {
    scope: 4,
    blurValue: 0.434,
    redBlurData: [],
    greenBlurData: [],
    yellowBlurData: [],
    allFills: [],
    fillDate: '',
    trackType: ''
}


const fillReducer = (state = initialState,action) => {
    
    switch (action.type) {
        case UPDATE_BLUR:
            if(action.updateType === 'm'){
                return{
                    ...state,
                    greenBlurData: action.updateData
                }
            }
            else if(action.updateType === 't'){
                return{
                    ...state,
                    redBlurData: action.updateData
                }
            }
            else{
                return{
                    ...state,
                    yellowBlurData: action.updateData
                }
            }
        case SET_SCOPE:
            return{
                ...state,
                scope: action.scopeValue
            }

        case SET_BLUR_VALUE:
            return{
                ...state,
                blurValue: action.blurValue
            } 
        case SET_FILL_DATE:
            return{
                ...state,
                fillDate: action.fillDate
            }
        case SET_TRACK_TYPE:
            return{
                ...state,
                trackType: action.trackType
            }
        default:
            return state;
    }
}


export default fillReducer;