import React from 'react';
import {SafeAreaView} from 'react-native';
import ReduxThunk from 'redux-thunk';

import {createStore,combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import fillReducer from './store/reducers/fillReducer';
import fileReducer from './store/reducers/fileReducer';
import dbRedcuer from './store/reducers/dbRedcuer';

import * as dbFunctions from './database/connection';

import MainNavigator from './navigation/MainNavigator';

const rootReducer = combineReducers({
  fill: fillReducer,
  file: fileReducer,
  db: dbRedcuer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

dbFunctions.init();

export default function App() {
    return (
      <Provider store={store}>
         <SafeAreaView style={{flex:1}}>
           <MainNavigator/>
           </SafeAreaView>   
      </Provider>
    );
}
