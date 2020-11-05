import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MyButton = (props) => {
    return(
        <View style={{...styles.buttonContainer, ...props.color}}>
            <TouchableOpacity onPress={props.onClick}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer:{
        height: 40,
        borderRadius: 12,
        elevation: 6,
        width: '100%',
        justifyContent: 'center',
    },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase'
    }
})

export default MyButton;