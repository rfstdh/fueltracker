import React from 'react';
import {View,Text,StyleSheet, Button} from 'react-native';


const Card = (props)=> {
    
    let roadType = '';
    switch (props.trackType) {
        case "a":
           roadType = 'Highway'
           break; 
        case "t":
            roadType = 'Track'
            break;         
        default:
            roadType = 'City'
            break; 
    }
    
    
    return(
        <View style={styles.cardContainer}>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Actual usage: <Text style={{fontWeight: 'bold'}}>{props.amount} litres / 100 km</Text></Text>
                <View style={styles.deleteButton}><Button title="Delete" color="#d11a2a" onPress={props.onDelete}/></View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>CPU usage: <Text style={{fontWeight: 'bold'}}>{props.cpuamount} litres / 100 km</Text></Text>
                </View>
                <View>
                    <Text>Since last fill: <Text style={{fontWeight: 'bold'}}>{props.km} KM</Text></Text>
                    <Text>Track type: {roadType}</Text>
                    <Text>Date: {props.date}</Text>
                    <Text>Comments: {props.comments}</Text>
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
        padding: 20
    },
    deleteButton:{
    }
})

export default Card;