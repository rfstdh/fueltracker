import React from 'react';


import {createAppContainer} from 'react-navigation';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator,CardStyleInterpolators} from 'react-navigation-stack';

import AddFill from '../screens/AddFill';
import FillList from '../screens/FillList';
import MainScreen from '../screens/Main';
import AboutScreen from '../screens/MenuScreens/AboutScreen';
import SettingsScreen from '../screens/MenuScreens/SettingsScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CustomHeaderButton from '../components/CustomHeaderButton';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import { Platform } from 'react-native';

const rootNavigator = createStackNavigator({
    Main: {
      screen: MainScreen,
      navigationOptions: (navData) => {
        return{
          headerTitle: 'Histogram zużycia paliwa',
          headerRight: () => 
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item title='Add' iconName='add' onPress={()=>{navData.navigation.navigate('Add');}}></Item>
                </HeaderButtons>,
          headerTintColor: '#ed2929',
        }
      }
    },
    Add: {
      screen: AddFill,
      navigationOptions: {
        headerTitle: 'Nowe tankowanie',
        headerBackTitle: 'Wróć',
        headerTintColor: '#ed2929',
        cardStyleInterpolator: Platform.OS === 'ios' ? CardStyleInterpolators.forHorizontalIOS :  CardStyleInterpolators.forNoAnimation,
        animationEnabled: Platform.OS === 'ios' ? true : false,
        transitionConfig: () => ({
          transitionSpec: {
              duration: 0,
              timing: 0,
          },
      })     
      }
    }
}, {navigationOptions: (navData) => {
    return{
      tabBarVisible: navData.navigation.state.routes[navData.navigation.state.index].routeName === 'Add' ? false : true,
    }
}});


const listNavigator = createStackNavigator({
    List: {
      screen: FillList,
      navigationOptions:{
        headerTintColor: '#ed2929'
      }
    }
});

const settingsNavigator = createStackNavigator({
    Settings: 
    {
      screen: SettingsScreen,
      navigationOptions:{
        headerTintColor: '#ed2929'
      }
    }
});

const aboutNavigator = createStackNavigator({
    About: {
      screen: AboutScreen,
      navigationOptions:{
        headerTintColor: '#ed2929'
      }
    }
});
  
const mainScreenConfig = {
    Main: 
    {
      screen: rootNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="stats-chart" size={20} color={tabInfo.tintColor} style={{marginTop: 3}}/>
        },
        tabBarLabel: 'Wykres',
      }
    },
    List: {
      screen: listNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <MaterialIcons name="local-gas-station" size={20} color={tabInfo.tintColor} style={{marginTop: 3}}/>
        },
        tabBarLabel: 'Lista',
      }
    },
    Settings: {
      screen: settingsNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="md-settings" size={20} color={tabInfo.tintColor} style={{marginTop: 3}}/>
        },
        tabBarLabel: 'Ustawienia',
      }
    },
    About: {
      screen: aboutNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return <Ionicons name="ios-information-circle-outline" size={20} color={tabInfo.tintColor} style={{marginTop: 3}}/>
        },
        tabBarLabel: 'O autorze',
      }
    }
}
  
const tabNavigator = createMaterialTopTabNavigator(mainScreenConfig,{
  initialRouteName:'Main',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: '#ed2929',
    inactiveTintColor: 'black',
    style:{
      backgroundColor: 'white',
      elevation: 7,
    },
    indicatorStyle:{
      height: 0
    },
    tabStyle:{
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
    },
    iconStyle:{
      alignItems: 'center',
    },
    labelStyle:{
      textAlign: 'center',
      fontSize: 10
    },
    showIcon: true,
    allowFontScaling: true,
  }
})

export default createAppContainer(tabNavigator);