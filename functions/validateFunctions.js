//validate fuel usage
export const validateUsage = (value) => {
    let rgx = /\,{1}|\.{2,}|[\.\,]{2,}/
    let newValue = value.replace(rgx,'.')

    let rgx2 = /[^0-9\.]{1,}/
    let anotherValue = newValue.replace(rgx2,'')

    let rgx3 = /^\./
    let av = anotherValue.replace(rgx3,'')

    let rgx4 = /.{3}\./
    
    if(av.match(rgx4)){
        av = av.substring(0,av.length-1)
    }
    return av;
}

export const validateMileage = (value) => {
    let rgx = /[^0-9]{1,}/
    let newValue = value.replace(rgx,'')
    return newValue;
}

export const validateComments = (value) => {
    let rgx = /[\'\"\;]/
    let newValue = value.replace(rgx,'')
    return newValue;
}