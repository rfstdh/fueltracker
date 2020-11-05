import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {View, Text,FlatList, StyleSheet} from 'react-native';
import Card from '../components/Card';

import * as dbFunctions from '../database/connection';
import * as dbActions from '../store/actions/dbActions';


const FillList = () => {
    
    const fillHistory = useSelector(state=>state.db.fills)
    // console.log(fillHistory)
    const dispatch = useDispatch();
    return(
        <View style={styles.container}>
            {/* funny but keyExtractor must be in form of a string */}
            <FlatList data={fillHistory} keyExtractor={(item) => item.id.toString()} 
            renderItem={(itemData)=>(<Card 
                amount={itemData.item.usage.toString()} 
                cpuamount={itemData.item.cpuUsage.toString()} 
                km={itemData.item.kilometersDriven.toString()} 
                trackType={itemData.item.trackType} 
                date={itemData.item.date}
                comments={itemData.item.comments!=='null' ? itemData.item.comments : 'Brak'}
                onDelete={()=>{dbFunctions.removeFromDatabase(itemData.item.id).then(()=>{dispatch(dbActions.fetchData());})}}/>)}
            />
        </View>
    );
}

FillList.navigationOptions = () => {
    return{
        headerTitle: 'Wszystkie tankowania'
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default FillList;