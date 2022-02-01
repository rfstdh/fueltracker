import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {View,Text,StyleSheet,TextInput,ScrollView} from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryScatter} from "victory-native";

import * as convertFunctions from '../../functions/convertFunctions';
import * as statsFunctions from '../../functions/statsFunctions';


import SegmentedControlTab from "react-native-segmented-control-tab";
import ErrorStatsPage from '../../components/ErrorStatsPage';

const ErrorDistribution = (props) => {
    
    const dbData = useSelector(state=>state.db.fills);
    
    //topChart state
    const [selectedIndex, setSelectedIndex] = useState(2);
    //checkbox state
    const [topYellow,setTopYellow] = useState(true);
    const [topGreen,setTopGreen] = useState(false);
    const [topRed,setTopRed] = useState(false);

    //different data state based on year season (0-all seasons, 1 - spring, 2 - summer, 3 - autumn, 4 - winter)
    const [currentSeason, setCurrentSeason] = useState(0);

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
     
    var r,g,y;
    [r,g,y] = convertFunctions.convertToErrorChartData(dbData, currentSeason);

    var averageRed, averageGreen, averageYellow, redDataLength, greenDataLength, yellowDataLength;
    [averageRed, averageGreen, averageYellow, redDataLength, greenDataLength, yellowDataLength] = statsFunctions.calculateAvgs(dbData, false, true, true, currentSeason);

    var modeY,modeR,modeG;
    [modeY, modeG, modeR] = statsFunctions.calculateErrorMode(y,g,r);
    
    var medianRed, medianGreen, medianYellow;  
    [medianYellow, medianGreen, medianRed] = statsFunctions.calculateErrorMedian(y,g,r);
    
    const seasonChange = () => {
      setCurrentSeason((currentSeason + 1) % 5)
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


    const DOT_SIZE = 4;
    const CHART_WIDTH = 550;
    const CHART_HEIGHT = 350;

    return(
        <ScrollView contentContainerStyle={styles.outerContainer}>
            <View style={styles.navBar}>
                <SegmentedControlTab
                    values={["Miasto", "Trasa", "Autostrada"]}
                    selectedIndex={selectedIndex}
                    onTabPress={(index)=>{setSelectedIndex(index);setTopChart(index);}}
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
                {topRed ?
                <VictoryChart theme={VictoryTheme.material} width={CHART_WIDTH} height={CHART_HEIGHT}>
                    <VictoryScatter style={{ data: { fill: "green" } }} size={DOT_SIZE} data={g} x="litres" y="error"/>
                    <VictoryScatter style={{ data: { fill: "#c49102" } }} size={DOT_SIZE} data={y} x="litres" y="error"/>
                    <VictoryScatter style={{ data: { fill: "#c43a31" } }} size={DOT_SIZE} data={r} x="litres" y="error"/>
                </VictoryChart> : null}
                {topGreen ?
                <VictoryChart theme={VictoryTheme.material} width={CHART_WIDTH} height={CHART_HEIGHT}>
                    <VictoryScatter style={{ data: { fill: "#c43a31" } }} size={DOT_SIZE} data={r} x="litres" y="error"/>
                    <VictoryScatter style={{ data: { fill: "#c49102" } }} size={DOT_SIZE} data={y} x="litres" y="error"/>
                    <VictoryScatter style={{ data: { fill: "green" } }} size={DOT_SIZE} data={g} x="litres" y="error"/>
                </VictoryChart> : null}
                {topYellow ?
                <VictoryChart theme={VictoryTheme.material} width={CHART_WIDTH} height={CHART_HEIGHT}>
                    <VictoryScatter style={{ data: { fill: "#c43a31" } }} size={DOT_SIZE} data={r} x="litres" y="error"/>
                    <VictoryScatter style={{ data: { fill: "green" } }} size={DOT_SIZE} data={g} x="litres" y="error"/>
                    <VictoryScatter style={{ data: { fill: "#c49102" } }} size={DOT_SIZE} data={y} x="litres" y="error"/>
                </VictoryChart> : null}
            </ScrollView>
            <ErrorStatsPage 
              onSeasonChange={seasonChange}
              seasonText={getCurrentSeasonName(currentSeason)}
              chartType={selectedIndex == 2 ? "Autostrada" : selectedIndex == 1 ? "Trasa" : "Miasto"} 
              chartColor="#ff7034" 
              errorAverage={selectedIndex == 2 ? averageYellow : selectedIndex == 1 ? averageGreen : averageRed} 
              errorMedian={selectedIndex == 2 ? medianYellow : selectedIndex == 1 ? medianGreen : medianRed}
              errorMode={selectedIndex == 2 ? modeY : selectedIndex == 1 ? modeG : modeR}> 
            </ErrorStatsPage>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    navBar:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
      },
      outerContainer:{
          alignItems: 'center',
          justifyContent: 'center'
      },
      innerContainer:{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})

export default ErrorDistribution;