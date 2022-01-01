import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ErrorStatsPage = (props) => {

    return(
        <View style={styles.statistics}>
            <View style={styles.statTitle}>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>Średni błąd pomiarowy ({props.chartType})</Text>
            </View>
            <View style={styles.statRowContainer}>
                <View style={{...styles.statRow, width: "40%"}}>
                    <View style={styles.statIcon}>
                        <MaterialCommunityIcons name='fire' size={48} color={props.chartColor}/>
                    </View>
                    <View style={styles.statInfo}>
                        <Text style={styles.textStyle}>Średnia:</Text>                   
                    </View>
                </View>
                <View style={{...styles.statRow, width: "60%"}}>
                    <View style={styles.statValue}>
                        <Text style={styles.textStyle}>{props.errorAverage} litra / 100 km</Text>                   
                    </View>
                </View>
            </View>
            <View style={styles.statRowContainer}>
                <View style={{...styles.statRow, width: "40%"}}>
                    <View style={styles.statIcon}>
                        <MaterialCommunityIcons name='fire' size={48} color={props.chartColor}/>
                    </View>
                    <View style={styles.statInfo}>
                        <Text style={styles.textStyle}>Mediana:</Text>                   
                    </View>
                </View>
                <View style={{...styles.statRow, width: "60%"}}>
                    <View style={styles.statValue}>
                        <Text style={styles.textStyle}>{props.errorMedian} litra / 100 km</Text>                   
                    </View>
                </View>
            </View>
            <View style={styles.statRowContainer}>
                <View style={{...styles.statRow, width: "40%"}}>
                    <View style={styles.statIcon}>
                        <MaterialCommunityIcons name='fire' size={48} color={props.chartColor}/>
                    </View>
                    <View style={styles.statInfo}>
                        <Text style={styles.textStyle}>Moda:</Text>                   
                    </View>
                </View>
                <View style={{...styles.statRow, width: "60%"}}>
                    <View style={styles.statValue}>
                        <Text style={styles.textStyle}>{props.errorMode} litra / 100 km</Text>                   
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    statistics:{
        width: '90%',
        elevation: 6,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginVertical: 20,
    },
    statRowContainer:{
        width: '100%',
        flexDirection: 'row'
    },
    statTitle:{
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        alignItems: 'center',
        textAlign: 'center'
    },
    textStyle:{
        fontWeight: 'bold',
        fontSize: 18
    },
    statRow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    statIcon:{
        width: '40%',
    },
    statInfo:{
        width: '60%',
    },
    statValue:{
        width: '100%',
        alignItems: 'center'
    }
})

export default ErrorStatsPage;