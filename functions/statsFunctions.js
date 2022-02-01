import * as dateFunctions from '../functions/dateFunctions';

export const calculateAvgs = (dbData, isRealData, isWeightenedData, isErrorAverage, currentSeason) => {
    
    let sumYellow = 0;
    let sumGreen = 0;
    let sumRed = 0;
    let averageYellow = 0;
    let averageGreen = 0;
    let averageRed = 0;
    

    let redDataLength = 0;
    let greenDataLength = 0;
    let yellowDataLength = 0;
    for (let i = 0; i < dbData.length; i++) {
        let element = dbData[i]
        let elementWeight = i == 0 ? 0.3 : parseFloat(((element.kilometersDriven - dbData[i-1].kilometersDriven) / 500).toFixed(2))
        let occuranceFactor = isWeightenedData ? elementWeight : 1
        switch (dbData[i].trackType) {
            case 'm':
                if(currentSeason != 0 && !dateFunctions.checkSeason(currentSeason, element.date))continue;
                redDataLength += occuranceFactor
                if(isErrorAverage){
                    sumRed+= occuranceFactor * dbData[i].usageError
                    break;
                }
                else{
                    sumRed+= isRealData ? occuranceFactor * dbData[i].usage : occuranceFactor * dbData[i].cpuUsage;
                    break;
                }
            case 't':
                if(currentSeason != 0 && !dateFunctions.checkSeason(currentSeason, element.date))continue;
                greenDataLength += occuranceFactor
                if(isErrorAverage){
                    sumGreen+= occuranceFactor * dbData[i].usageError
                    break;
                }
                else{
                    sumGreen+= isRealData ? occuranceFactor * dbData[i].usage : occuranceFactor * dbData[i].cpuUsage;
                    break;
                }
            case 'a':
                if(currentSeason != 0 && !dateFunctions.checkSeason(currentSeason, element.date))continue;
                yellowDataLength += occuranceFactor
                if(isErrorAverage){
                    sumYellow+= occuranceFactor * dbData[i].usageError
                    break;
                }
                else{
                    sumYellow+= isRealData ? occuranceFactor * dbData[i].usage : occuranceFactor * dbData[i].cpuUsage;
                    break;
                }
            default:
                break;
        }                        
    }
    averageRed = redDataLength != 0 ?  sumRed / redDataLength : 0;
    averageGreen = greenDataLength != 0 ?  sumGreen / greenDataLength : 0;
    averageYellow =  yellowDataLength != 0 ? sumYellow / yellowDataLength : 0;

    //we now need record count instead of sum of weights
    redDataLength = dbData.filter(item=>item.trackType === "m" && dateFunctions.checkSeason(currentSeason, item.date)).length;
    greenDataLength = dbData.filter(item=>item.trackType === "t" && dateFunctions.checkSeason(currentSeason, item.date)).length;
    yellowDataLength = dbData.filter(item=>item.trackType === "a" && dateFunctions.checkSeason(currentSeason, item.date)).length;

    return [averageRed.toFixed(2), averageGreen.toFixed(2), averageYellow.toFixed(2),
    redDataLength, greenDataLength, yellowDataLength];      
}   

export const calculateMode = (yellow, green, red) => {
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

export const calculateErrorMode = (yellowData, greenData, redData) => {
    
    let yellowErrorValues = new Map()
    let greenErrorValues = new Map()
    let redErrorValues = new Map()
    //sum of individual error values
    for (let i = 0; i < yellowData.length; i++) {
        if(typeof yellowErrorValues.get(yellowData[i].error) !== "undefined"){
            yellowErrorValues.set(yellowData[i].error, yellowErrorValues.get(yellowData[i].error) + yellowData[i].occurance)
        }
        else{
            yellowErrorValues.set(yellowData[i].error, yellowData[i].occurance)
        }       
    }
    //yellow key of max value
    let yellowMode = yellowData.length > 0 ? [...yellowErrorValues.entries()].reduce((prev, curr ) => curr[1] > prev[1] ? curr : prev)[0] : 0

    for (let i = 0; i < greenData.length; i++) {
        if(typeof greenErrorValues.get(greenData[i].error) !== "undefined"){
            greenErrorValues.set(greenData[i].error, greenErrorValues.get(greenData[i].error) + greenData[i].occurance)
        }
        else{
            greenErrorValues.set(greenData[i].error, greenData[i].occurance)
        }       
    }
    //green key of max value
    let greenMode = greenData.length > 0 ? [...greenErrorValues.entries()].reduce((prev, curr ) => curr[1] > prev[1] ? curr : prev)[0] : 0

    for (let i = 0; i < redData.length; i++) {
        if(typeof redErrorValues.get(redData[i].error) !== "undefined"){
            redErrorValues.set(redData[i].error, redErrorValues.get(redData[i].error) + redData[i].occurance)
        }
        else{
            redErrorValues.set(redData[i].error, redData[i].occurance)
        }       
    }
    //red key of max value
    let redMode = redData.length > 0 ? [...redErrorValues.entries()].reduce((prev, curr ) => curr[1] > prev[1] ? curr : prev)[0] : 0
    return [yellowMode, greenMode, redMode];
}


export const calculateErrorMedian = (yellowData, greenData, redData) => {
    
    let redMedian = 0;
    let greenMedian = 0;
    let yellowMedian = 0;
    redData.sort((a,b) => {
        return a.error > b.error
    })
  
    if(redData.length % 2 == 1){
        redMedian = redData[parseInt(redData.length / 2)].error
    }
    else{
        redMedian = redData.length > 0 ? (redData[parseInt(redData.length / 2)].error + redData[parseInt(redData.length / 2) - 1].error) / 2 : 0
    }

    greenData.sort((a,b) => {
        return a.error > b.error
    })

    if(greenData.length % 2 == 1){
        greenMedian = greenData[parseInt(greenData.length / 2)].error
    }
    else{
        greenMedian = greenData.length > 0 ? (greenData[parseInt(greenData.length / 2)].error + greenData[parseInt(greenData.length / 2) - 1].error) / 2 : 0
    }

    yellowData.sort((a,b) => {
        return a.error > b.error
    })

    if(yellowData.length % 2 == 1){
        yellowMedian = yellowData[parseInt(yellowData.length / 2)].error
    }
    else{
        yellowMedian = yellowData.length > 0 ? (yellowData[parseInt(yellowData.length / 2)].error + yellowData[parseInt(yellowData.length / 2) - 1].error) / 2 : 0
    }

    return [yellowMedian, greenMedian, redMedian];
    
}