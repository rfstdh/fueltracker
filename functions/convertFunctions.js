//convert data from database to chart data fromat i.e {litres: x, occurance: y, trackType: m}
export const convertToChartData = (data) => {
    var redArray = [];
    var greenArray = [];
    var yellowArray = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        //console.log(element);
        if(element.trackType === 'm'){
            var ch = redArray.find(item=>item.litres === parseFloat(element.usage.toFixed(1)));
            if(typeof ch !== 'undefined'){
                ch.occurance +=1;
                redArray = redArray.map(item=>item.litres === ch.litres ? ch : item)
            }
            else{
                redArray.push({litres:parseFloat(element.usage.toFixed(1)), occurance: 1, trackType: element.trackType})
            }
        }
        else if(element.trackType === 't'){
            var ch = greenArray.find(item=>item.litres === parseFloat(element.usage.toFixed(1)));
            if(typeof ch !== 'undefined'){
                ch.occurance +=1;
                // greenArray = [...greenArray,ch];
                greenArray = greenArray.map(item=>item.litres === ch.litres ? ch : item)
            }
            else{
                greenArray.push({litres:parseFloat(element.usage.toFixed(1)), occurance: 1, trackType: element.trackType})
            }
        }
        else{
            var ch = yellowArray.find(item=>item.litres === element.usage);
            if(typeof ch !== 'undefined'){
                ch.occurance +=1;
                yellowArray = yellowArray.map(item=>item.litres === ch.litres ? ch : item)
            }
            else{
                yellowArray.push({litres:parseFloat(element.usage.toFixed(1)), occurance: 1, trackType: element.trackType})
            }
        }
        
    }
    return [redArray,greenArray,yellowArray];
}
