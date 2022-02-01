import React from 'react';
import { View,Text, StyleSheet } from 'react-native';

import {useSelector,useDispatch} from 'react-redux';

import Tile from '../../components/Tile';
import AwesomeIcons from 'react-native-vector-icons/FontAwesome5';

import * as fileFunctions from '../../functions/fileFunctions';
import * as dbFunctions from '../../database/connection';
import * as dbActions from '../../store/actions/dbActions';

import * as Colors from '../../constants/Colors';

const SettingsScreen = () => {
    
    const dispatch = useDispatch();
    const dbData = useSelector(state=>state.db.fills);

    const loadDataFromDatabase = async () => {
        await fileFunctions.openFile();
        dispatch(dbActions.fetchData()).then(()=>{}) 
      }
    
    const saveChart = async () => {
        //just for development
        //await dbFunctions.saveDb().then(res=>console.log(res)).catch(err=>console.log(err))
        await fileFunctions.saveFile(dbData);
    }
    
    const shareChart = () => {
        fileFunctions.shareFile(dbData);
    }
    
    
    return(
        <View style={styles.container}>           
            <View style={styles.tileRow}>
                <Tile onSelect={()=>{loadDataFromDatabase();}}>
                    <AwesomeIcons name='file-import' size={32} style={{color: Colors.coolRed}}/>
                    <Text style={{fontSize: 18, color: Colors.coolRed, textAlign: 'center'}}>Importuj</Text>
                </Tile>
                <Tile onSelect={()=>{saveChart();}}>
                    <AwesomeIcons name='file-export' size={32} style={{color: Colors.coolRed}}/>
                    <Text style={{fontSize: 18, color: Colors.coolRed}}>Eksportuj</Text>
                </Tile>
            </View>
            <View style={styles.tileRow}>
                <Tile onSelect={()=>{shareChart();}}>
                    <AwesomeIcons name='share' size={32} style={{color: Colors.coolRed}}/>
                    <Text style={{fontSize: 18, color: Colors.coolRed}}>Udostępnij</Text>
                </Tile>
                <Tile>
                    <AwesomeIcons name='book-open' size={32} style={{color: Colors.coolRed}}/>
                    <Text style={{fontSize: 18, color: Colors.coolRed}}>Pomoc</Text>
                </Tile>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    tileRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        flex: 1
    }
})

SettingsScreen.navigationOptions = () => {
    return{
        headerTitle: 'Ustawienia'
    }
}

export default SettingsScreen;