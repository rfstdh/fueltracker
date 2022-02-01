export const ADD_FILE_DATA = "ADD_FILE_DATA";
export const ADD_RED_FILE_DATA = "ADD_RED_FILE_DATA";
export const ADD_GREEN_FILE_DATA = "ADD_GREEN_FILE_DATA";
export const ADD_YELLOW_FILE_DATA = "ADD_YELLOW_FILE_DATA";
export const ADD_MIXED_FILE_DATA = "ADD_MIXED_FILE_DATA";


export const addFileData = (fileData) => {
    return{
        type: ADD_FILE_DATA,
        fileData: fileData
    }
}


export const addRedFileData = (redFileData) => {
    return{
        type: ADD_RED_FILE_DATA,
        redFileData: redFileData
    }
}

export const addGreenFileData = (greenFileData) => {
    return{
        type: ADD_GREEN_FILE_DATA,
        greenFileData: greenFileData
    }
}

export const addYellowFileData = (yellowFileData) => {
    return{
        type: ADD_YELLOW_FILE_DATA,
        yellowFileData: yellowFileData
    }
}

export const addMixedFileData = (mixedFileData) => {
    return{
        type: ADD_MIXED_FILE_DATA,
        mixedFileData: mixedFileData
    }
}