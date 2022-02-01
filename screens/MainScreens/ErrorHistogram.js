import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {View,Text,StyleSheet,TextInput,ScrollView} from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme} from "victory-native";

import * as convertFunctions from '../../functions/convertFunctions';

import SegmentedControlTab from "react-native-segmented-control-tab";
import DistributionStatsPage from '../../components/DistributionStatsPage';


const ErrorHistogram = (props) => {
    
    const BAR_WIDTH = 4;
    const CHART_WIDTH = 550;
    const CHART_HEIGHT = 350;
    
    const dbData = useSelector(state=>state.db.fills);

    const [selectedIndex, setSelectedIndex] = useState(3);

    //different data state based on year season (0-all seasons, 1 - spring, 2 - summer, 3 - autumn, 4 - winter)
    const [currentSeason, setCurrentSeason] = useState(0);

    let allErrorData, yellowErrorData, greenErrorData, redErrorData;
    [allErrorData, yellowErrorData ,greenErrorData ,redErrorData] = convertFunctions.convertToErrorHistogramData(dbData, currentSeason);


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

    return(
        <ScrollView contentContainerStyle={styles.outerContainer}>
             <View style={styles.navBar}>
                <SegmentedControlTab
                    values={["Miasto", "Trasa", "Autostrada", "Wszystkie"]}
                    selectedIndex={selectedIndex}
                    onTabPress={(index)=>{setSelectedIndex(index);}}
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
                <VictoryChart theme={VictoryTheme.material} width={CHART_WIDTH} height={CHART_HEIGHT}>
                    {selectedIndex == 0 ? <VictoryBar style={{data:{fill: "#c43a31", width:BAR_WIDTH}}} data={redErrorData} x="error" y="occurance" /> : null}
                    {selectedIndex == 1 ? <VictoryBar style={{data:{fill: "green", width:BAR_WIDTH}}} data={greenErrorData} x="error" y="occurance" /> : null}
                    {selectedIndex == 2 ? <VictoryBar style={{data:{fill: "#c49102", width:BAR_WIDTH}}} data={yellowErrorData} x="error" y="occurance" /> : null}
                    {selectedIndex == 3 ? <VictoryBar style={{data:{fill: "#186db6", width:BAR_WIDTH}}} data={allErrorData} x="error" y="occurance" /> : null}
                </VictoryChart>
            </ScrollView>
            <DistributionStatsPage 
              onSeasonChange={seasonChange}
              seasonText={getCurrentSeasonName(currentSeason)}
              chartType={selectedIndex == 2 ? "Autostrada" : selectedIndex == 1 ? "Trasa" : selectedIndex == 0 ? "Miasto" : "Wszystkie"} > 
            </DistributionStatsPage>
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

export default ErrorHistogram;