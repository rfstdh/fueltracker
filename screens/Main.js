import React,{useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import CustomHeaderButton from '../components/CustomHeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Tile from '../components/Tile';
import Histogram from './MainScreens/Histogram';
import ErrorDistribution from './MainScreens/ErrorDistribution';
import ErrorHistogram from './MainScreens/ErrorHistogram';

const Main = (props) => {
    
  //toolbar and main screen title options
  const [showChartToolbar, setShowChartToolbar] = useState(false);
  const [chartTitle, setChartTitle] = useState("Histogram zużycia paliwa");
  
  //chart type: HW - weightnened histogram, HN - normal histogram, ED - error distribution, EH - error histogram
  const [chartType, setChartType] = useState("HN");
  
  updateTitle = () => {
    props.navigation.setParams({
      title: chartTitle,
      openDropdownMenu: () => {
        setShowChartToolbar(!showChartToolbar)
      }
    });
  }

  
  useEffect(()=>{
    updateTitle();
  },[showChartToolbar])

  changeChart = (type) => {
      setChartType(type);
  }

  return(
    <View style={styles.big}>
      {showChartToolbar ? <ScrollView style={styles.toolbarContainer}>
        <Tile onSelect={() => {setShowChartToolbar(!showChartToolbar);setChartTitle("Histogram zużycia paliwa");setChartType("HN")}}><Text>Histogram normalny</Text></Tile>
        <Tile onSelect={() => {setShowChartToolbar(!showChartToolbar);setChartTitle("Histogram ważony");setChartType("HW")}}><Text>Histogram ważony</Text></Tile>
        <Tile onSelect={() => {setShowChartToolbar(!showChartToolbar);setChartTitle("Rozkład błędów");setChartType("ED")}}><Text>Rozkład błędów</Text></Tile>
        <Tile onSelect={() => {setShowChartToolbar(!showChartToolbar);setChartTitle("Histogram błędów");setChartType("EH")}}><Text>Histogram rozkładu błędów</Text></Tile>
        </ScrollView> : null }
        {chartType == "HN" ? <Histogram weightenedData={false}></Histogram> : 
        chartType == "HW" ? <Histogram weightenedData={true}></Histogram> : 
        chartType == "ED" ? <ErrorDistribution></ErrorDistribution> : 
        chartType == "EH" ? <ErrorHistogram></ErrorHistogram>: null}
      </View>
  );
}

Main.navigationOptions = (navData) => {
  return{
    headerTitle: navData.navigation.getParam("title"),
    headerTintColor: '#ed2929',
    headerTitleAlign: 'center',
    headerRight: () => 
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title='Add' iconName='add' onPress={()=>{navData.navigation.navigate('Add')}}></Item>
          </HeaderButtons>,
    headerLeft: () => 
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title='Add' iconName='add-chart' onPress={navData.navigation.getParam("openDropdownMenu")}></Item>
        </HeaderButtons>,
  }
}

const styles = StyleSheet.create({
  big:{
    flex:1,
  },
  toolbarContainer:{
    flex: 1, 
    backgroundColor: 'rgba(100, 100, 100, 0.8)', 
    ...StyleSheet.absoluteFillObject, 
    zIndex: 100
  }
})

export default Main;