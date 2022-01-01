import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {View,Text,StyleSheet,TextInput,ScrollView} from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme} from "victory-native";

import * as convertFunctions from '../../functions/convertFunctions';

const ErrorHistogram = (props) => {
    
    const BAR_WIDTH = 4;
    const CHART_WIDTH = 550;
    const CHART_HEIGHT = 350;
    
    const dbData = useSelector(state=>state.db.fills);

    const errorData = convertFunctions.convertToErrorHistogramData(dbData);

    return(
        <ScrollView contentContainerStyle={styles.outerContainer}>
            <ScrollView horizontal contentContainerStyle={styles.innerContainer}>  
                <VictoryChart theme={VictoryTheme.material} width={CHART_WIDTH} height={CHART_HEIGHT}>
                    <VictoryBar style={{data:{fill: "#c43a31", width:BAR_WIDTH}}} data={errorData} x="error" y="occurance" />
                </VictoryChart>
            </ScrollView>
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