export const calculateAvgs = (dbData, isRealData) => {
    
    let sumYellow = 0;
    let sumGreen = 0;
    let sumRed = 0;
    let averageYellow = 0;
    let averageGreen = 0;
    let averageRed = 0;
    

    let redDataLength = dbData.filter(item=>item.trackType == 'm').length;
    let greenDataLength = dbData.filter(item=>item.trackType == 't').length;
    let yellowDataLength = dbData.filter(item=>item.trackType == 'a').length;
    for (let i = 0; i < dbData.length; i++) {
        switch (dbData[i].trackType) {
            case 'm':
                sumRed+= isRealData ? dbData[i].usage : dbData[i].cpuUsage;
                break;
            case 't':
                sumGreen+= isRealData ? dbData[i].usage : dbData[i].cpuUsage;
                break;
            case 'a':
                sumYellow+= isRealData ? dbData[i].usage : dbData[i].cpuUsage;
            default:
                break;
        }                        
    }
    averageRed = redDataLength != 0 ?  sumRed / redDataLength : 0;
    averageGreen = greenDataLength != 0 ?  sumGreen / greenDataLength : 0;
    averageYellow =  yellowDataLength != 0 ? sumYellow / yellowDataLength : 0;
    return [averageRed.toFixed(2), averageGreen.toFixed(2), averageYellow.toFixed(2),
    redDataLength, greenDataLength, yellowDataLength];      
}   

export const calculateMode = (yellow,green,red) => {
    let maxY = yellow[0];
    let maxG = green[0];
    let maxR = red[0];
    for (let i = 0; i < yellow.length; i++) {
        if(yellow[i].occurance>maxY.occurance){
            maxY = yellow[i];
        }       
    }
    for (let i = 0; i < green.length; i++) {
        if(green[i].occurance>maxG.occurance){
            maxG = green[i];
        }       
    }
    for (let i = 0; i < red.length; i++) {
        if(red[i].occurance>maxR.occurance){
            maxR = red[i];
        }       
    }
    return [maxY ? maxY.litres.toFixed(2) : 0,
        maxG ? maxG.litres.toFixed(2) : 0,
        maxR ? maxR.litres.toFixed(2) : 0];
}