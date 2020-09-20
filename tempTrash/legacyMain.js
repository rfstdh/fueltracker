import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as fillActions from '../store/actions/fillActions';
import * as fileActions from '../store/actions/fileActions';

import { VictoryBar, VictoryChart, VictoryTheme, VictoryGroup, VictoryLegend} from "victory-native";
import {View, StyleSheet, Text, Button,TextInput, KeyboardAvoidingView, ScrollView, Platform, Switch} from 'react-native';

// import CheckBox from '@react-native-community/checkbox';
import {CheckBox} from 'react-native-elements';

//try
import * as fileFunctions from '../functions/fileFunctions';
import * as dbFunctions from '../database/connection';
import * as dbActions from '../store/actions/dbActions';
import * as convertFunctions from '../functions/convertFunctions';


const Main = (props) => {
    
    //data from reducer
    // const redData = useSelector(state=>state.fill.redData);
    // const greenData = useSelector(state=>state.fill.greenData);
    const redBlurData = useSelector(state=>state.fill.redBlurData);
    const greenBlurData = useSelector(state=>state.fill.greenBlurData);
    const yellowBlurData = useSelector(state=>state.fill.yellowBlurData);
    
    //data from file
    const redData = useSelector(state=>state.file.fileRedData);
    const greenData = useSelector(state=>state.file.fileGreenData);
    const yellowData = useSelector(state=>state.file.fileYellowData);

    let dbData = useSelector(state=>state.db.fills);

    const dispatch = useDispatch();

    const scope = useSelector(state=>state.fill.scope);
    const blurValue = useSelector(state=>state.fill.blurValue);
    const [shouldBlurShow, setShouldBlurShow] = useState(false);


    //switch state
    const [showYellow, setShowYellow] = useState(true);
    const [showGreen, setShowGreen] = useState(true);
    const [showRed, setShowRed] = useState(true);

    //checkbox state
    const [topYellow,setTopYellow] = useState(true);
    const [topGreen,setTopGreen] = useState(false);
    const [topRed,setTopRed] = useState(false);

    redData.sort((a,b) => {
      return a.litres > b.litres
    })

    greenData.sort((a,b) => {
      return a.litres > b.litres
    })

    yellowData.sort((a,b) => {
      return a.litres > b.litres
    })

    //blur function, i.e  f(x) = 1 - ((x/10)^2 / m^2), where m = 0.434
    const blurFunction = (x) => {
    var value = Math.max(1 - ((x/10)**2 / blurValue**2),0);
    return value;
    }

    //function entanglement, histogram with blur function    
    const funcEntaglement = (middleValue,dataset) => {
    //console.log(middleValue);
    var startIndex = Math.max(middleValue - (scope/10),0);
    var endIndex = middleValue + (scope/10);
    //console.log(startIndex,endIndex)
    var si = parseFloat(startIndex.toFixed(1))
    var ei = parseFloat(endIndex.toFixed(1))
    let sum = 0;
    let j = -scope;
    //console.log(si,ei)
    for (let i = si; i <= ei; i+=0.1) {
        i = parseFloat(i.toFixed(1));
        //console.log(i,sum)
        //if didnt work then parseFloat(item.quarter.toFixed(1))
        var ob = dataset.find(item=>item.litres == i)
        if(typeof ob !== 'undefined'){         
          sum += (ob.occurance * blurFunction(j));     
        }
        j++; 
      }
      //console.log(sum);
    return sum;
    }

    
    const plotRedFunc = () => {
      let q1 = redData[0].litres;
      let newBlurArray = [];
      for (let i = 0; i < redData.length; i++) {
          q1 = redData[i].litres;
          var qs = parseFloat((q1-(scope/10)).toFixed(1));
          var qe = parseFloat((q1+(scope/10)).toFixed(1));
          for (let j = qs; j <= qe; j+=0.1) {
  
            j = parseFloat(j.toFixed(1));
            const element = funcEntaglement(j,redData);
                   
            //console.log(element.toFixed(5) / 2);  
            var ch = newBlurArray.find(item=>item.litres === j);
            if(element > 0 && typeof ch === 'undefined')
            { {var ob = {litres: j, occurance: element.toFixed(1) / 2, type: 't'}
            newBlurArray.push(ob)}
          }
            //q1+=0.1;
          }
      }
      //setGreenBlurData(newBlurArray)
      //console.log(newBlurArray)
      dispatch(fillActions.updateBlur(newBlurArray,'t'))
      }


    const plotGreenFunc = () => {
    let q1 = greenData[0].litres;
    let newBlurArray = [];
    for (let i = 0; i < greenData.length; i++) {
        q1 = greenData[i].litres;
        var qs = parseFloat((q1-(scope/10)).toFixed(1));
        var qe = parseFloat((q1+(scope/10)).toFixed(1));
        for (let j = qs; j <= qe; j+=0.1) {

          j = parseFloat(j.toFixed(1));
          const element = funcEntaglement(j,greenData);
           
          var ch = newBlurArray.find(item=>item.litres === j);
          //console.log(element.toFixed(5) / 2);  
          if(element>0 && typeof ch === 'undefined')
          {
            {var ob = {litres: j, occurance: element.toFixed(1) / 2, type: 'm'}
          newBlurArray.push(ob)}
          }
          //q1+=0.1;
        }
    }
    //setGreenBlurData(newBlurArray)
    //console.log(newBlurArray)
    dispatch(fillActions.updateBlur(newBlurArray,'m'))
    }


    const plotYellowFunc = () => {
      let q1 = yellowData[0].litres;
      let newBlurArray = [];
      for (let i = 0; i < yellowData.length; i++) {
          q1 = yellowData[i].litres;
          var qs = parseFloat((q1-(scope/10)).toFixed(1));
          var qe = parseFloat((q1+(scope/10)).toFixed(1));
          for (let j = qs; j <= qe; j+=0.1) {
  
            j = parseFloat(j.toFixed(1));
            const element = funcEntaglement(j,yellowData);
                   

            var ch = newBlurArray.find(item=>item.litres === j);
            //console.log(element.toFixed(5) / 2);  
            if(element>0  && typeof ch === 'undefined')
            {
              {var ob = {litres: j, occurance: element.toFixed(1) / 2, type: 'a'}
            newBlurArray.push(ob)}
            }
            //q1+=0.1;
          }
      }
      //setGreenBlurData(newBlurArray)
      //console.log(newBlurArray)
      dispatch(fillActions.updateBlur(newBlurArray,'a'))
      }


        const plotAll = () => {

        plotRedFunc();
        plotGreenFunc();
        plotYellowFunc();
        setShouldBlurShow(true);
        }

        // useEffect(()=>{
        //   plotRedFunc();
        //   plotGreenFunc();
        //   setShouldBlurShow(true);
        // },[redData,greenData])
        // var max = redData.reduce((a, b) => a.quarter > b.quarter ? a : b)
        var barWidth = 3;

        // console.log('main');
        // console.log(dbData);

      const loadDataFromDatabase = async () => {
        await fileFunctions.openFile();
        dispatch(dbActions.fetchData()).then(()=>{}) 
    }

    const loadChart = () => {
      var r,g,y;
      [r,g,y] = convertFunctions.convertToChartData(dbData)
      //console.log(r);
      // console.log(g)
      // console.log(y)
      dispatch(fileActions.addRedFileData(r));
      dispatch(fileActions.addGreenFileData(g));
      dispatch(fileActions.addYellowFileData(y));
    }

    useEffect(()=>{
      console.log('chart');
      loadChart();
      //plotAll();
    },[dbData])

    // //starting useEffect
    useEffect(()=>{
      console.log('starting');
      dispatch(dbActions.fetchData())
    },[])

    const saveChart = () => {
      var allData = [];
      allData = allData.concat(redData);
      allData = allData.concat(greenData);
      allData = allData.concat(yellowData);
      //console.log(allData);
      fileFunctions.saveFile(dbData);
    }

    const shareChart = () => {
      var allData = [];
      allData = allData.concat(redBlurData);
      allData = allData.concat(greenBlurData);
      allData = allData.concat(yellowBlurData);
      fileFunctions.shareFile(dbData);
    }
    
    return(
      <View style={styles.big}>
        <ScrollView contentContainerStyle={styles.container}>   
        <ScrollView horizontal contentContainerStyle={styles.container}>             
            {topYellow && showYellow?   <VictoryChart width={850} height={350} theme={VictoryTheme.material}>    
              {/* loading via reducer            */}
              {/* {shouldBlurShow ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="quarter" y="earnings" /> : null}
              <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="quarter" y="earnings" />
              {shouldBlurShow ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="quarter" y="earnings" /> : null}
              <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="quarter" y="earnings" />    */}

              {/* loading via file */}
              {shouldBlurShow && showRed ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="litres" y="occurance" /> : null}
              {showRed ?  <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="litres" y="occurance" /> : null }
              {shouldBlurShow && showGreen ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="litres" y="occurance" /> : null}
              {showGreen ? <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="litres" y="occurance" /> : null }
              {shouldBlurShow && showYellow ? <VictoryBar style={{data:{fill: '#f9a602', width:barWidth}}} data={yellowBlurData} x="litres" y="occurance" /> : null}
              {showYellow ? <VictoryBar style={{data:{fill: '#c49102', width: barWidth}}} data={yellowData} x="litres" y="occurance" />  : null }   
            </VictoryChart> : null}

            {topGreen && showGreen ?   <VictoryChart width={850} height={350} theme={VictoryTheme.material}>   
              {/* loading via reducer            */}
              {/* {shouldBlurShow ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="quarter" y="earnings" /> : null}
              <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="quarter" y="earnings" />
              {shouldBlurShow ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="quarter" y="earnings" /> : null}
              <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="quarter" y="earnings" />    */}

              {/* loading via file */}
              {shouldBlurShow  && showRed ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="litres" y="occurance" /> : null}
              {showRed ?  <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="litres" y="occurance" /> : null }

              {shouldBlurShow && showYellow ? <VictoryBar style={{data:{fill: '#f9a602', width:barWidth}}} data={yellowBlurData} x="litres" y="occurance" /> : null}
              {showYellow ? <VictoryBar style={{data:{fill: '#c49102', width: barWidth}}} data={yellowData} x="litres" y="occurance" />  : null }   
              {shouldBlurShow && showGreen ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="litres" y="occurance" /> : null}
              {showGreen ? <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="litres" y="occurance" /> : null }
            </VictoryChart> : null}

            {topRed && showRed ?   <VictoryChart width={850} height={350} theme={VictoryTheme.material}>  
              {/* loading via reducer            */}
              {/* {shouldBlurShow ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="quarter" y="earnings" /> : null}
              <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="quarter" y="earnings" />
              {shouldBlurShow ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="quarter" y="earnings" /> : null}
              <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="quarter" y="earnings" />    */}

              {/* loading via file */}

              {shouldBlurShow && showRed ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="litres" y="occurance" /> : null}
              {showGreen ? <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="litres" y="occurance" /> : null }
              {shouldBlurShow && showYellow ? <VictoryBar style={{data:{fill: '#f9a602', width:barWidth}}} data={yellowBlurData} x="litres" y="occurance" /> : null}
              {showYellow ? <VictoryBar style={{data:{fill: '#c49102', width: barWidth}}} data={yellowData} x="litres" y="occurance" />  : null }   
              {shouldBlurShow && showGreen ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="litres" y="occurance" /> : null}
              {showRed ?  <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="litres" y="occurance" /> : null }
            </VictoryChart> : null}
           
          </ScrollView> 
          {/* <View style={{height: 100, backgroundColor: 'white'}}> */}
            <VictoryLegend x={Platform.OS === 'android' ? 20 : 15} y={0} height={120}
              title="Histogram zużycia paliwa"
              centerTitle
              orientation="vertical"
              itemsPerRow={3}
              gutter={20}
              style={{ border: { stroke: "black", strokeWidth: 1}, title: {fontSize: 16 }, labels: {fontSize: Platform.OS === 'ios' ? 10 : 11 }}}
              data={[
                { name: "Średnie zużycie (miasto)", symbol: { fill: "#800000"} },
                { name: "Średnie zużycie (trasa)", symbol: { fill: "green" } },
                { name: "Średnie zużycie (autostrada)", symbol: { fill: "#c49102" } },
                { name: "Średnie zużycie/rozmyte (miasto)", symbol: { fill: "red" } },
                { name: "Średnie zużycie/rozmyte (trasa)", symbol: { fill: "#00ff00" } },
                { name: "Średnie zużycie/rozmyte (autostrada)   ", symbol: { fill: "#f9a602" } }
              ]}/>
          <Button title="PLOT" onPress={plotAll} />
          <Button title="DB" onPress={()=>{dbFunctions.init().then(res=>console.log(res))}} />
          <Button title="SAveDB" onPress={()=>dbFunctions.saveDb()} />
          <Button title="See all fills" onPress={()=>props.navigation.navigate('List')} />
          <Button title="Add to database" onPress={()=>props.navigation.navigate('Add')} />
          <Button title="Get from database" onPress={()=>{dispatch(dbActions.fetchData())}} />
          <View style={styles.switchContainer}>
            <Switch value={showYellow} onValueChange={(newValue)=>setShowYellow(newValue)} trackColor={{false: 'gray', true: '#f9a602'}} thumbColor='#c49102'/><Text>Yellow Chart</Text>
            <Switch value={showGreen} onValueChange={(newValue)=>setShowGreen(newValue)} trackColor={{false: 'gray', true: '#00ff00'}} thumbColor='green'/><Text>Green Chart</Text>
            <Switch value={showRed} onValueChange={(newValue)=>setShowRed(newValue)} trackColor={{false: 'gray', true: 'red'}} thumbColor='#800000'/><Text>Red Chart</Text>
          </View>
          
          {/* checkboxes are android only */}
         <View style={styles.switchContainer}>
          <CheckBox
            center
            containerStyle={{backgroundColor: 'white', borderWidth: 0}}
            title='Yellow Top'
            checked={topYellow}
            onIconPress={()=>{setTopYellow(!topYellow);setTopGreen(false); setTopRed(false)}}
            checkedColor='#c49102'/>
                 <CheckBox
            center
            containerStyle={{backgroundColor: 'white', borderWidth: 0}}
            title='Green Top'
            checked={topGreen}
            onIconPress={()=>{setTopGreen(!topGreen);setTopRed(false);setTopYellow(false)}}
            checkedColor='green'/>
                 <CheckBox
            center
            containerStyle={{backgroundColor: 'white', borderWidth: 0}}
            title='Red Top'
            checked={topRed}
            onIconPress={()=>{setTopRed(!topRed); setTopYellow(false); setTopGreen(false)}}
            checkedColor='#800000'/>
          </View>
          
          {/* <Button title="checj" onPress={()=>{console.log(funcEntaglement(0,greenData))}} /> */}
          <View style={styles.options}>
            <Text>Scope</Text>
            <TextInput style={styles.textInput} keyboardType='number-pad' value={scope.toString()} onChangeText={(text)=>dispatch(fillActions.setScope(text))}/>
          </View>
          <KeyboardAvoidingView style={styles.options} behavior='positon'>
            <Text>Blur value</Text>
            <TextInput style={styles.textInput} keyboardType='number-pad' value={blurValue.toString()} onChangeText={(text)=>dispatch(fillActions.setBlurValue(text))} />
          </KeyboardAvoidingView>
    
          <View style={styles.details}>
            {/* <Button style={styles.checkButton} title="See your fills" onPress={()=>{props.navigation.navigate('List')}} />
            <Button style={styles.checkButton} title="Add new fill" onPress={()=>{props.navigation.navigate('Add');}} /> */}
            <Button style={styles.checkButton} title="Load files" onPress={loadDataFromDatabase}/>
            <Button style={styles.checkButton} title="Save files" onPress={Platform.OS === 'android' ? saveChart : shareChart} />
            <Button style={styles.checkButton} title="Share files" onPress={shareChart} />
          </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
  big:{
    flex:1
      },
  container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
  switchContainer:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput:{
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      width: '50%',
      height: 20,
      margin: 20
    },
    options:{
      flexDirection: 'row',
      width: '50%',
      height: 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 10,
    },
    details:{
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '80%',
      marginBottom: 20
    },
    checkButton:{
      width: 50
    }
})

export default Main;