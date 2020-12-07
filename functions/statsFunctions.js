export const calculateAvgs = (dbData, isRealData, chartType) => {
    
    let sum = 0;
    let avg = 0;
    let symbol = '';
    if(chartType===0){symbol='m'}
    if(chartType===1){symbol='t'}
    if(chartType===2){symbol='a'}
    if(isRealData){
        var filteredData = dbData.filter(item => item.trackType === symbol);           
        for (let i = 0; i < filteredData.length; i++) {
            sum+=filteredData[i].usage;               
        }
        avg = sum / filteredData.length;
        return [avg.toFixed(2),filteredData.length];      
    }
    else{
        var filteredData = dbData.filter(item => item.trackType === symbol);           
        for (let i = 0; i < filteredData.length; i++) {
            sum+=filteredData[i].cpuUsage;               
        }
        avg = sum / filteredData.length;
        return [avg.toFixed(2),filteredData.length];
    }
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
    return [maxY.litres,maxG.litres,maxR.litres];
}