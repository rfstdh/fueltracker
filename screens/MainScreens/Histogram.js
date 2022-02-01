import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';


import * as fillActions from '../../store/actions/fillActions';
import * as fileActions from '../../store/actions/fileActions';

import { VictoryBar, VictoryChart, VictoryTheme} from "victory-native";
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import SegmentedControlTab from "react-native-segmented-control-tab";

//try
import * as fileFunctions from '../../functions/fileFunctions';
import * as dbActions from '../../store/actions/dbActions';
import * as convertFunctions from '../../functions/convertFunctions';
import * as statsFunctions from '../../functions/statsFunctions';


import StatsPage from '../../components/StatsPage';
import * as Colors from '../../constants/Colors';

const Histogram = (props) => {
    
    const chartWidth = 550;
    const chartHeight = 350;

    const redBlurData = useSelector(state=>state.fill.redBlurData);
    const greenBlurData = useSelector(state=>state.fill.greenBlurData);
    const yellowBlurData = useSelector(state=>state.fill.yellowBlurData);
    
    //data from file
    const redData = useSelector(state=>state.file.fileRedData);
    const greenData = useSelector(state=>state.file.fileGreenData);
    const yellowData = useSelector(state=>state.file.fileYellowData);
    const mixedData = useSelector(state=>state.file.fileMixedData);

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
    const [showMixed, setShowMixed] = useState(false);

    //checkbox state
    const [topYellow,setTopYellow] = useState(true);
    const [topGreen,setTopGreen] = useState(false);
    const [topRed,setTopRed] = useState(false);

    //different data state
    const [realData, setRealData] = useState(true);

    //different data state based on year season (0-all seasons, 1 - spring, 2 - summer, 3 - autumn, 4 - winter)
    const [currentSeason, setCurrentSeason] = useState(0);

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
      var r,g,y, mixed;
      [r,g,y, mixed] = convertFunctions.convertToChartData(dbData, realData, props.weightenedData, currentSeason);
      dispatch(fileActions.addRedFileData(r));
      dispatch(fileActions.addGreenFileData(g));
      dispatch(fileActions.addYellowFileData(y));
      dispatch(fileActions.addMixedFileData(mixed));
    }

    

    useEffect(()=>{
      console.log('chart');
      loadChart();
    },[dbData, realData, showMixed, props.weightenedData, currentSeason])

    useEffect(()=>{
      plotAll();
    },[redData, greenData, yellowData, props.weightenedData, currentSeason])

    // //starting useEffect
    useEffect(()=>{
      console.log('starting');
      dispatch(dbActions.fetchData())
    },[])
   
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

    const switchCharts = () => {
        setRealData(!realData);
        loadChart();
    }

    const seasonChange = () => {
      setCurrentSeason((currentSeason + 1) % 5)
      loadChart();
    }

    const changeMixedVisibility = () => {
      setShowMixed(!showMixed);
      loadChart();
    }

    const getCurrentSeasonName = (season) => {
      switch (season) {
        case 0:
          return "Wszystkie";
        case 1:
          return "Wiosna";
        case 2:
          return "Lato";
        case 3:
          return "Jesień";
        case 4:
          return "Zima";
        default:
          return "Wszystkie";
      }
    }

    //calculate avg based on current settings (realData, chartType)
    var averageRed, averageGreen, averageYellow, redDataLength, greenDataLength, yellowDataLength;
    [averageRed, averageGreen, averageYellow, redDataLength, greenDataLength, yellowDataLength] = statsFunctions.calculateAvgs(dbData,realData, props.weightenedData, false, currentSeason);

    //calculate most occurent value(mode->dominanta)
    var modeY,modeR,modeG;
    [modeY,modeG,modeR] = statsFunctions.calculateMode(yellowBlurData,greenBlurData,redBlurData);


    
    return(
        <ScrollView contentContainerStyle={styles.outerContainer}>
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
              {/* mixed always visible */}
              {showMixed ? <VictoryBar style={{data:{fill: 'blue', width: barWidth}}} data={mixedData} x="litres" y="occurance" /> : null}
            </VictoryChart> : null}

            {topGreen && showGreen ?   <VictoryChart domainPadding={2} width={chartWidth} height={chartHeight} theme={VictoryTheme.material}>   
              {/* loading via file */}
              {shouldBlurShow  && showRed ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="litres" y="occurance" /> : null}
              {showRed ?  <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="litres" y="occurance" /> : null }
              {shouldBlurShow && showYellow ? <VictoryBar style={{data:{fill: '#f9a602', width:barWidth}}} data={yellowBlurData} x="litres" y="occurance" /> : null}
              {showYellow ? <VictoryBar style={{data:{fill: '#c49102', width: barWidth}}} data={yellowData} x="litres" y="occurance" />  : null }   
              {shouldBlurShow && showGreen ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="litres" y="occurance" /> : null}
              {showGreen ? <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="litres" y="occurance" /> : null }
              {/* mixed always visible */}
              {showMixed ? <VictoryBar style={{data:{fill: 'blue', width: barWidth}}} data={mixedData} x="litres" y="occurance" /> : null}
            </VictoryChart> : null}

            {topRed && showRed ?   <VictoryChart domainPadding={2} width={chartWidth} height={chartHeight} theme={VictoryTheme.material}>  
              {/* loading via file */}
              {shouldBlurShow && showGreen ? <VictoryBar style={{data:{fill: '#00ff00', width:barWidth}}} data={greenBlurData} x="litres" y="occurance" /> : null}
              {showGreen ? <VictoryBar style={{data:{fill: 'green', width: barWidth}}} data={greenData} x="litres" y="occurance" /> : null }
              {shouldBlurShow && showYellow ? <VictoryBar style={{data:{fill: '#f9a602', width:barWidth}}} data={yellowBlurData} x="litres" y="occurance" /> : null}
              {showYellow ? <VictoryBar style={{data:{fill: '#c49102', width: barWidth}}} data={yellowData} x="litres" y="occurance" />  : null }   
              {shouldBlurShow && showRed ? <VictoryBar style={{data:{fill: 'red', width:barWidth}}} data={redBlurData} x="litres" y="occurance" /> : null}
              {showRed ?  <VictoryBar style={{data:{fill: '#800000',  width: barWidth}}} data={redData} x="litres" y="occurance" /> : null }
              {/* mixed always visible */}
              {showMixed ? <VictoryBar style={{data:{fill: 'blue', width: barWidth}}} data={mixedData} x="litres" y="occurance" /> : null}
            </VictoryChart> : null}
           
          </ScrollView> 
                       
          {topRed ? <StatsPage 
                      topChart='Miasto' 
                      chartColor={Colors.redChartColor} 
                      chartBlurColor={Colors.redChartBlurColor}
                      titleText={realData ? 'dystrybutor' : 'komputer'}
                      onClick={switchCharts}
                      onMixedClick={changeMixedVisibility}
                      onSeasonChange={seasonChange}
                      seasonText={getCurrentSeasonName(currentSeason)}
                      avg={averageRed}
                      mode={modeR}
                      length={redDataLength}/> : 
                    topGreen ? <StatsPage 
                    topChart='Trasa'
                    chartColor={Colors.greenChartColor}
                    chartBlurColor={Colors.greenChartBlurColor}
                    titleText={realData ? 'dystrybutor' : 'komputer'}
                    onClick={switchCharts}
                    onMixedClick={changeMixedVisibility}
                    onSeasonChange={seasonChange}
                    seasonText={getCurrentSeasonName(currentSeason)}
                    avg={averageGreen}
                    mode={modeG}
                    length={greenDataLength}/> : <StatsPage 
                    topChart='Autostrada'
                    chartColor={Colors.yellowChartColor}
                    chartBlurColor={Colors.yellowChartBlurColor}
                    titleText={realData ? 'dystrybutor' : 'komputer'}
                    onClick={switchCharts}
                    onMixedClick={changeMixedVisibility}
                    onSeasonChange={seasonChange}
                    seasonText={getCurrentSeasonName(currentSeason)}
                    avg={averageYellow}
                    mode={modeY}
                    length={yellowDataLength}/>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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


export default Histogram;