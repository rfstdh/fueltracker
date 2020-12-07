import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

const AboutScreen = () => {
    return(
        <View style={styles.container}>
            <Text>Autor aplikacji: Marcin Oniszczuk</Text>
            <Text>Aplikacja zrealizowana w ramach </Text>
            <Text>pracy inżynierskiej na SGGW</Text>
            <Text>w latach 2020/2021</Text>
            <Text>Wersja aplikacji: 1.0.0</Text>
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

AboutScreen.navigationOptions = () => {
    return{
        headerTitle: 'O autorze'
    }
}

export default AboutScreen;