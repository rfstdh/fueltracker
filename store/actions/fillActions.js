export const UPDATE_BLUR = "UPDATE_BLUR";
export const SET_SCOPE = "SET_SCOPE";
export const SET_BLUR_VALUE = "SET_BLUR_VALUE";
export const SET_FILL_DATE = 'SET_FILL_DATE';
export const SET_TRACK_TYPE = 'SET_TRACK_TYPE';

export const updateBlur = (blurData, blurType)=>{
    return{
        type: UPDATE_BLUR,
        updateData: blurData,
        updateType: blurType
    }
}

export const setScope = (scopeValue) => {
    return{
        type: SET_SCOPE,
        scopeValue: scopeValue
    }
}

export const setBlurValue = (blurValue) => {
    return{
        type: SET_BLUR_VALUE,
        blurValue: blurValue
    }
}

export const setFillDate = (date) => {
    return{
        type: SET_FILL_DATE,
        fillDate: date
    }
}

export const setTrackType = (trackType) => {
    return{
        type: SET_TRACK_TYPE,
        trackType: trackType
    }
}
