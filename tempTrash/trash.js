

    // const badEntaglement = (middleIndex,dataset) => {
    //   var startIndex = Math.max(middleIndex - scope,0);
    //   var endIndex = Math.min(middleIndex + scope,dataset.length);
    //   let sum=0;
    //   let j = -scope;
    //   for (let i = startIndex; i < endIndex; i++) {
        
    //     sum+= dataset[i].earnings * blurFunction(j);
    //     j++;
    //   }
    //   return sum;
    // }

    // const badRed = () => {
    //   let q = redData[0].quarter;
    //   let newArray = [];
    //   for (let i = 0; i < redData.length; i++) {
    //     const element = badEntaglement(i,redData)
    //     var ob = {quarter: parseFloat(q.toFixed(1)), earnings: element.toFixed(5) / 2}
    //     newArray.push(ob);
    //     q+=0.1
    //   }
    //   dispatch(fillActions.updateBlur(newArray,'t'))
    // }

    // const badGreen = () => {
    //   let q = greenData[0].quarter;
    //   let newArray = [];
    //   for (let i = 0; i < greenData.length; i++) {
    //     const element = badEntaglement(i,greenData)
    //     var ob = {quarter: parseFloat(q.toFixed(1)), earnings: element.toFixed(5) / 2}
    //     newArray.push(ob);
    //     q+=0.1
    //   }
    //   dispatch(fillActions.updateBlur(newArray,'m'))
    // }


    // const plotRedFunc = () => {
    // let q = redData[0].quarter;
    // let newBlurArray = [];
    // for (let i = 0; i < redData.length; i++) {
    //   q = redData[i].quarter;
    //   var qs = parseFloat((q-0.8).toFixed(1));
    //   var qe = parseFloat((q+0.8).toFixed(1));
    //   for (let j = qs; j <= qe; j+=0.1) {
        
    //     j = parseFloat(j.toFixed(1));
    //     const element = funcEntaglement(j,redData);
        
    //     //console.log(element.toFixed(5) / 2);
    //     var ob = {quarter: parseFloat(j.toFixed(1)), earnings: element.toFixed(5) / 2}
    //     newBlurArray.push(ob)  
    //     //q+=0.1;
    //   }
    // }
    // //console.log(newBlurArray)
    // dispatch(fillActions.updateBlur(newBlurArray,'t'))
    // }