import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';

const Tile = (props) => {
    
    let TouchableComponent = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }
    
    return(
        <View style={styles.container}>
            <TouchableComponent style={{flex:1}} onPress={props.onSelect} >
                <View style={styles.tileContainer}>
                    {props.children} 
                </View>
            </TouchableComponent>  
        </View>   
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 20,
    },
    tileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        borderRadius: 15,
        elevation: 6,
        backgroundColor: '#fff',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
    }
})

export default Tile;