import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

const AboutScreen = () => {
    return(
        <View style={styles.container}>
            <Text>About me</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    }
})

export default AboutScreen;