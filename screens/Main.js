import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';


import * as fillActions from '../store/actions/fillActions';
import * as fileActions from '../store/actions/fileActions';

import { VictoryBar, VictoryChart, VictoryTheme, VictoryGroup, VictoryLegend} from "victory-native";
import {View, StyleSheet, Text, Button,TextInput, KeyboardAvoidingView, ScrollView, Platform, Switch} from 'react-native';

// import CheckBox from '@react-native-community/checkbox';
import {CheckBox} from 'react-native-elements';
import SegmentedControlTab from "react-native-segmented-control-tab";

//try
import * as fileFunctions from '../functions/fileFunctions';
import * as dbActions from '../store/actions/dbActions';
import * as convertFunctions from '../functions/convertFunctions';


import StatsPage from '../components/StatsPage';
import * as Colors from '../constants/Colors';

import CustomHeaderButton from '../components/CustomHeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

const Main = (props) => {
    
    const chartWidth = 550;
    const chartHeight = 350;

    const redBlurData = useSelector(state=>state.fill.redBlurData);
    const greenBlurData = useSelector(state=>state.fill.greenBlurData);
    const yellowBlurData = useSelector(state=>state.fill.yellowBlurData);
    
    //data from file
    const redData = useSelector(state=>state.file.fileRedData);
    const greenData = useSelector(state=>state.file.fileGreenData);
    const yellowData = useSelector(state=>state.file.fileYellowData);

    const dbData = useSelector(state=>state.db.fills);

    const dispatch = useDispatch();

    const scope = useSelector(state=>state.fill.scope);
    const blurValue = useSelector(state=>state.fill.blurValue);
    const [shouldBlurShow, setShouldBlurShow] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(2);


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
      let q1 = 0;
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
      let q1 = 0;
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
      let q1 = 0;
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
      console.log('plotting')
      plotRedFunc();
      plotGreenFunc();
      plotYellowFunc();
      setShouldBlurShow(true);
    }

    var barWidth = 3;

    const loadDataFromDatabase = async () => {
      await fileFunctions.openFile();
      dispatch(dbActions.fetchData()).then(()=>{}) 
    }

    const loadChart = () => {
      var r,g,y;
      [r,g,y] = convertFunctions.convertToChartData(dbData);
      console.log(g);
      dispatch(fileActions.addRedFileData(r));
      dispatch(fileActions.addGreenFileData(g));
      dispatch(fileActions.addYellowFileData(y));
    }

    

    useEffect(()=>{
      console.log('chart');
      loadChart();
    },[dbData])

    useEffect(()=>{
      plotAll();
    },[redData, greenData, yellowData])

    // //starting useEffect
    useEffect(()=>{
      console.log('starting');
      dispatch(dbActions.fetchData())
    },[])

    const saveChart = () => {
      fileFunctions.saveFile(dbData);
    }

    const shareChart = () => {
      fileFunctions.shareFile(dbData);
    }
    
    const setTopChart = (chartIndex) => {
      switch (chartIndex) {
        case 0:
          setTopRed(true); setTopYellow(false); setTopGreen(false);
          break;
        case 1:
          setTopGreen(true);setTopRed(false);setTopYellow(false);
          break;
        case 2:
          setTopYellow(true);setTopGreen(false); setTopRed(false);
        default:
          break;
      }
    }

    return(
      <View style={styles.big}>
        <ScrollView contentContainerStyle={styles.outerContainer}>
          {/* <View style={{flexDirection:'row', justifyContent: 'space-between', width: '90%', paddingTop: 20}}>
            <View onTouchStart={()=>{setTopRed(true); setTopYellow(false); setTopGreen(false)}} style={{backgroundColor: 'red', width: '30%', height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}><Text>Miasto</Text></View>
            <View onTouchStart={()=>{setTopGreen(true);setTopRed(false);setTopYellow(false)}} style={{backgroundColor: 'green', width: '30%', height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}><Text>Trasa</Text></View>
            <View onTouchStart={()=>{setTopYellow(true);setTopGreen(false); setTopRed(false)}} style={{backgroundColor: '#c49102', width: '30%', height: 30, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}><Text>Autostrada</Text></View>
          </View>    */}
          {/* <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 20}}>Histogram zużycia paliwa</Text> */}
        <View style={styles.navBar}>
          <SegmentedControlTab
            values={["Miasto", "Trasa", "Autostrada"]}
            selectedIndex={selectedIndex}
            onTabPress={(index)=>{setSelectedIndex(index); setTopChart(index)}}
            activeTabStyle={{backgroundColor: '#ed2929'}}
            tabsContainerStyle={{width: '90%', marginTop: 20,borderWidth:1, borderRadius: 6, borderColor: '#ed2929'}}
            tabStyle={{borderWidth: 0, borderLeftWidth: 1,borderColor: '#ed2929', width: '100%'}}
            lastTabStyle={{borderLeftWidth: 1}}
            firstTabStyle={{borderLeftWidth: 0}}
            tabTextStyle={{color: '#ed2929'}}
            activeTabTextStyle={{color: 'white'}}
          />
        </View>
        <ScrollView horizontal contentContainerStyle={styles.innerContainer}>             
            {topYellow && showYellow?   <VictoryChart domainPadding={2} width={chartWidth} height={chartHeight} theme={VictoryTheme.material}>    
              {/* loading via file */}
              {shouldBlurShow && showRed ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="litres" y="occurance" /> : null}
              {showRed ?  <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="litres" y="occurance" /> : null }
              {shouldBlurShow && showGreen ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="litres" y="occurance" /> : null}
              {showGreen ? <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="litres" y="occurance" /> : null }
              {shouldBlurShow && showYellow ? <VictoryBar style={{data:{fill: '#f9a602', width:barWidth}}} data={yellowBlurData} x="litres" y="occurance" /> : null}
              {showYellow ? <VictoryBar style={{data:{fill: '#c49102', width: barWidth}}} data={yellowData} x="litres" y="occurance" />  : null }   
            </VictoryChart> : null}

            {topGreen && showGreen ?   <VictoryChart domainPadding={2} width={chartWidth} height={chartHeight} theme={VictoryTheme.material}>   
              {/* loading via file */}
              {shouldBlurShow  && showRed ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="litres" y="occurance" /> : null}
              {showRed ?  <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="litres" y="occurance" /> : null }

              {shouldBlurShow && showYellow ? <VictoryBar style={{data:{fill: '#f9a602', width:barWidth}}} data={yellowBlurData} x="litres" y="occurance" /> : null}
              {showYellow ? <VictoryBar style={{data:{fill: '#c49102', width: barWidth}}} data={yellowData} x="litres" y="occurance" />  : null }   
              {shouldBlurShow && showGreen ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="litres" y="occurance" /> : null}
              {showGreen ? <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="litres" y="occurance" /> : null }
            </VictoryChart> : null}

            {topRed && showRed ?   <VictoryChart domainPadding={2} width={chartWidth} height={chartHeight} theme={VictoryTheme.material}>  
              {/* loading via file */}
              {shouldBlurShow && showGreen ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="litres" y="occurance" /> : null}
              {showGreen ? <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="litres" y="occurance" /> : null }
              {shouldBlurShow && showYellow ? <VictoryBar style={{data:{fill: '#f9a602', width:barWidth}}} data={yellowBlurData} x="litres" y="occurance" /> : null}
              {showYellow ? <VictoryBar style={{data:{fill: '#c49102', width: barWidth}}} data={yellowData} x="litres" y="occurance" />  : null }   
              {shouldBlurShow && showRed ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="litres" y="occurance" /> : null}
              {showRed ?  <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="litres" y="occurance" /> : null }
            </VictoryChart> : null}
           
          </ScrollView> 
          {/* <View style={{height: 100, backgroundColor: 'white'}}> */}
            {/* <VictoryLegend x={Platform.OS === 'android' ? 20 : 15} y={0} height={120}
              title="Histogram zużycia paliwa"
              centerTitle
              orientation="vertical"
              itemsPerRow={3}
              gutter={20}
              style={{ border: { stroke: "black", strokeWidth: 1, color: 'red'}, title: {fontSize: 16 }, labels: {fontSize: Platform.OS === 'ios' ? 10 : 11 }}}
              data={[
                { name: "Średnie zużycie (miasto)", symbol: { fill: "#800000"} },
                { name: "Średnie zużycie (trasa)", symbol: { fill: "green" } },
                { name: "Średnie zużycie (autostrada)", symbol: { fill: "#c49102" } },
                { name: "Średnie zużycie/rozmyte (miasto)", symbol: { fill: "red" } },
                { name: "Średnie zużycie/rozmyte (trasa)", symbol: { fill: "#00ff00" } },
                { name: "Średnie zużycie/rozmyte (autostrada)   ", symbol: { fill: "#f9a602" } }
              ]}/> */}
                       
          {topRed ? <StatsPage 
                      topChart='Miasto' 
                      chartColor={Colors.redChartColor} 
                      chartBlurColor={Colors.redChartBlurColor}/> : 
                    topGreen ? <StatsPage 
                    topChart='Trasa'
                    chartColor={Colors.greenChartColor}
                    chartBlurColor={Colors.greenChartBlurColor}/> : <StatsPage 
                    topChart='Autostrada'
                    chartColor={Colors.yellowChartColor}
                    chartBlurColor={Colors.yellowChartBlurColor}/>}

          {/* <Button title="PLOT" onPress={plotAll} />
          <Button title="See all fills" onPress={()=>props.navigation.navigate('List')} />
          <Button title="Add to database" onPress={()=>props.navigation.navigate('Add')} />
          <Button title="Get from database" onPress={()=>{dispatch(dbActions.fetchData())}} /> */}
          {/* <View style={styles.switchContainer}>
            <Switch value={showYellow} onValueChange={(newValue)=>setShowYellow(newValue)} trackColor={{false: 'gray', true: '#f9a602'}} thumbColor='#c49102'/><Text>Yellow Chart</Text>
            <Switch value={showGreen} onValueChange={(newValue)=>setShowGreen(newValue)} trackColor={{false: 'gray', true: '#00ff00'}} thumbColor='green'/><Text>Green Chart</Text>
            <Switch value={showRed} onValueChange={(newValue)=>setShowRed(newValue)} trackColor={{false: 'gray', true: 'red'}} thumbColor='#800000'/><Text>Red Chart</Text>
          </View> */}
          
          {/* checkboxes are android only */}
         {/* <View style={styles.switchContainer}>
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
          </View> */}
          
          {/* <View style={styles.options}>
            <Text>Scope</Text>
            <TextInput style={styles.textInput} keyboardType='number-pad' value={scope.toString()} onChangeText={(text)=>dispatch(fillActions.setScope(text))}/>
          </View>
          <KeyboardAvoidingView style={styles.options} behavior='positon'>
            <Text>Blur value</Text>
            <TextInput style={styles.textInput} keyboardType='number-pad' value={blurValue.toString()} onChangeText={(text)=>dispatch(fillActions.setBlurValue(text))} />
          </KeyboardAvoidingView> */}
    
          {/* <View style={styles.details}>
            <Button style={styles.checkButton} title="Load files" onPress={loadDataFromDatabase}/>
            <Button style={styles.checkButton} title="Save files" onPress={Platform.OS === 'android' ? saveChart : shareChart} />
            <Button style={styles.checkButton} title="Share files" onPress={shareChart} />
          </View> */}
        </ScrollView>
        </View>
    );
}

Main.navigationOptions = (navData) => {
  return{
    headerTitle: 'Histogram zużycia paliwa',
    headerRight: () => 
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Add' iconName='add' onPress={()=>{navData.navigation.navigate('Add')}}></Item>
          </HeaderButtons>
  }
}

const styles = StyleSheet.create({
  big:{
    flex:1,
  },
  outerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  innerContainer:{
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer:{
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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