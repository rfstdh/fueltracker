import React from 'react';
import {StyleSheet,View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ReduxThunk from 'redux-thunk';

import AddFill from './screens/AddFill';
import FillList from './screens/FillList';
import MainScreen from './screens/Main';
import LoadFile from './screens/LoadFile';
import DatePickerScreen from './screens/PickerScreens/DatePickerScreen';
import TrackPickerScreen from './screens/PickerScreens/TrackPickerScreen';

import {createStore,combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import fillReducer from './store/reducers/fillReducer';
import fileReducer from './store/reducers/fileReducer';
import dbRedcuer from './store/reducers/dbRedcuer';

import * as dbFunctions from './database/connection';



const rootNavigator = createStackNavigator({
  Main: MainScreen,
  Add: AddFill,
  List: FillList,
  Load: LoadFile,
  Date: DatePickerScreen,
  Track: TrackPickerScreen
})

const rootReducer = combineReducers({
  fill: fillReducer,
  file: fileReducer,
  db: dbRedcuer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

dbFunctions.init();


export default function App() {
  
    const RootContainer = createAppContainer(rootNavigator);
    return (
      <Provider store={store}>
         <RootContainer>
           <MainScreen/>
           
         </RootContainer>
      </Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
