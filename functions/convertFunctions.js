//convert data from database to chart data fromat i.e {litres: x, occurance: y, trackType: m}
export const convertToChartData = (data, isRealData, isWeigthenedData) => {
    var redArray = [];
    var greenArray = [];
    var yellowArray = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let elementWeight = i == 0 ? 0.3 : parseFloat(((element.kilometersDriven - data[i-1].kilometersDriven) / 500).toFixed(2))
        let occuranceFactor = isWeigthenedData ? elementWeight : 1
        //console.log(element);
        if(element.trackType === 'm'){
            
            //decides whether to show CPUdata or real data on chart
            if(isRealData===true){
                var ch = redArray.find(item=>item.litres === parseFloat(element.usage.toFixed(1)));
            }
            else{
                var ch = redArray.find(item=>item.litres === parseFloat(element.cpuUsage.toFixed(1)));
            }

            
            if(typeof ch !== 'undefined'){
                ch.occurance +=occuranceFactor;
                redArray = redArray.map(item=>item.litres === ch.litres ? ch : item)
            }
            else{
                if(isRealData===true){
                    redArray.push({litres:parseFloat(element.usage.toFixed(1)), occurance: occuranceFactor, trackType: element.trackType})
                }
                else{
                    redArray.push({litres:parseFloat(element.cpuUsage.toFixed(1)), occurance: occuranceFactor, trackType: element.trackType})
                }
            }
        }
        else if(element.trackType === 't'){
            
            //decides whether to show CPUdata or real data on chart
            if(isRealData===true){
                var ch = greenArray.find(item=>item.litres === parseFloat(element.usage.toFixed(1)));
            }
            else{
                var ch = greenArray.find(item=>item.litres === parseFloat(element.cpuUsage.toFixed(1)));
            }


            if(typeof ch !== 'undefined'){
                ch.occurance +=occuranceFactor;
                // greenArray = [...greenArray,ch];
                greenArray = greenArray.map(item=>item.litres === ch.litres ? ch : item)
            }
            else{
                if(isRealData===true){
                    greenArray.push({litres:parseFloat(element.usage.toFixed(1)), occurance: occuranceFactor, trackType: element.trackType})
                }
                else{
                    greenArray.push({litres:parseFloat(element.cpuUsage.toFixed(1)), occurance: occuranceFactor, trackType: element.trackType})
                }
            }
        }
        else{
            
            //decides whether to show CPUdata or real data on chart
            if(isRealData===true){
                var ch = yellowArray.find(item=>item.litres === parseFloat(element.usage.toFixed(1)));
            }
            else{
                var ch = yellowArray.find(item=>item.litres === parseFloat(element.cpuUsage.toFixed(1)));
            }


            if(typeof ch !== 'undefined'){
                ch.occurance +=occuranceFactor;
                yellowArray = yellowArray.map(item=>item.litres === ch.litres ? ch : item)
            }
            else{
                if(isRealData===true){
                    yellowArray.push({litres:parseFloat(element.usage.toFixed(1)), occurance: occuranceFactor, trackType: element.trackType})
                }
                else{
                    yellowArray.push({litres:parseFloat(element.cpuUsage.toFixed(1)), occurance: occuranceFactor, trackType: element.trackType})
                }
            }
        }
        
    }
    return [redArray,greenArray,yellowArray];
}


//convert data from database to chart error data fromat i.e {litres: x, error: y, occurance: n, trackType: m}
export const convertToErrorChartData = (data) => {
    var redErrorArray = [];
    var greenErrorArray = [];
    var yellowErrorArray = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let elementWeight = i == 0 ? 0.3 : parseFloat(((element.kilometersDriven - data[i-1].kilometersDriven) / 500).toFixed(2))
        let occuranceFactor = elementWeight;
        if(element.trackType === 'm'){         
            
            var ch = redErrorArray.find(item=>item.litres === parseFloat(element.usage.toFixed(1)) && item.error === parseFloat(element.usageError.toFixed(1)));

            if(typeof ch !== 'undefined'){
                ch.occurance +=occuranceFactor;
                redErrorArray = redErrorArray.map(item=>item.litres === ch.litres && item.error == ch.error ? ch : item)
            }
            else{
                redErrorArray.push({litres:parseFloat(element.usage.toFixed(1)), error: parseFloat(element.usageError.toFixed(1)), occurance: occuranceFactor, trackType: element.trackType})
            }
        }
        else if(element.trackType === 't'){
            
            var ch = greenErrorArray.find(item=>item.litres === parseFloat(element.usage.toFixed(1)) && item.error === parseFloat(element.usageError.toFixed(1)));

            if(typeof ch !== 'undefined'){
                ch.occurance +=occuranceFactor;
                greenErrorArray = greenErrorArray.map(item=>item.litres === ch.litres && item.error == ch.error ? ch : item)
            }
            else{
                greenErrorArray.push({litres:parseFloat(element.usage.toFixed(1)), error: parseFloat(element.usageError.toFixed(1)), occurance: occuranceFactor, trackType: element.trackType})
            }
        }
        else{
            
            var ch = yellowErrorArray.find(item=>item.litres === parseFloat(element.usage.toFixed(1)) && item.error === parseFloat(element.usageError.toFixed(1)));

            if(typeof ch !== 'undefined'){
                ch.occurance +=occuranceFactor;
                yellowErrorArray = yellowErrorArray.map(item=>item.litres === ch.litres && item.error == ch.error ? ch : item)
            }
            else{
                yellowErrorArray.push({litres:parseFloat(element.usage.toFixed(1)), error: parseFloat(element.usageError.toFixed(1)), occurance: occuranceFactor, trackType: element.trackType})
            }
        }
        
    }
    return [redErrorArray,greenErrorArray,yellowErrorArray];
}


export const convertToErrorHistogramData = (data) => {
    let errorValues = []
    for (let i = 0; i < data.length; i++) {
        let element = data[i]
        let elementWeight = i == 0 ? 0.3 : parseFloat(((element.kilometersDriven - data[i-1].kilometersDriven) / 500).toFixed(2))

        var ch = errorValues.find(item=>item.error === parseFloat(element.usageError.toFixed(1)));
        if(typeof ch !== "undefined"){
            ch.occurance += elementWeight;
            errorValues = errorValues.map(item=>item.error == ch.error ? ch : item)
        }
        else{
            errorValues.push({error:parseFloat(element.usageError.toFixed(1)), occurance: elementWeight})
        } 
    }
    return errorValues;
}
