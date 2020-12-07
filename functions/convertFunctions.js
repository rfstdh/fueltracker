//convert data from database to chart data fromat i.e {litres: x, occurance: y, trackType: m}
export const convertToChartData = (data, isRealData) => {
    var redArray = [];
    var greenArray = [];
    var yellowArray = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
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
                ch.occurance +=1;
                redArray = redArray.map(item=>item.litres === ch.litres ? ch : item)
            }
            else{
                if(isRealData===true){
                    redArray.push({litres:parseFloat(element.usage.toFixed(1)), occurance: 1, trackType: element.trackType})
                }
                else{
                    redArray.push({litres:parseFloat(element.cpuUsage.toFixed(1)), occurance: 1, trackType: element.trackType})
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
                ch.occurance +=1;
                // greenArray = [...greenArray,ch];
                greenArray = greenArray.map(item=>item.litres === ch.litres ? ch : item)
            }
            else{
                if(isRealData===true){
                    greenArray.push({litres:parseFloat(element.usage.toFixed(1)), occurance: 1, trackType: element.trackType})
                }
                else{
                    greenArray.push({litres:parseFloat(element.cpuUsage.toFixed(1)), occurance: 1, trackType: element.trackType})
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
                ch.occurance +=1;
                yellowArray = yellowArray.map(item=>item.litres === ch.litres ? ch : item)
            }
            else{
                if(isRealData===true){
                    yellowArray.push({litres:parseFloat(element.usage.toFixed(1)), occurance: 1, trackType: element.trackType})
                }
                else{
                    yellowArray.push({litres:parseFloat(element.cpuUsage.toFixed(1)), occurance: 1, trackType: element.trackType})
                }
            }
        }
        
    }
    return [redArray,greenArray,yellowArray];
}
