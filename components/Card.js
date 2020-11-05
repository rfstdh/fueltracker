import React from 'react';
import {View,Text,StyleSheet, Button} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';


const Card = (props)=> {
    
    let roadType = '';
    switch (props.trackType) {
        case "a":
           roadType = 'Autostrada'
           break; 
        case "t":
            roadType = 'Trasa'
            break;         
        default:
            roadType = 'Miasto'
            break; 
    }
    
    
    return(
        <View style={styles.cardContainer}>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Zużycie: <Text style={{fontWeight: 'bold'}}>{props.amount} litrów / 100 km</Text></Text>
                <View style={styles.deleteButton}><Ionicons name='md-trash' size={22} color='#ed2929' onPress={props.onDelete}></Ionicons></View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Zużycie wg CPU: <Text style={{fontWeight: 'bold'}}>{props.cpuamount} litrów / 100 km</Text></Text>
                </View>
                <View>
                    <Text>Przebieg: <Text style={{fontWeight: 'bold'}}>{props.km} KM</Text></Text>
                    <Text>Rodzaj trasy: <Text style={{fontWeight: 'bold'}}>{roadType}</Text></Text>
                    <Text>Data: <Text style={{fontWeight: 'bold'}}>{props.date}</Text></Text>
                    <Text>Uwagi: <Text style={{fontWeight: 'bold'}}>{props.comments}</Text></Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer:{
        minHeight: 50,
        elevation: 6,
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 5,
        padding: 20,
        minWidth: 330
    },
})

export default Card;