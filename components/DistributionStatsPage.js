import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ShapiroWilkW, checkNormality} from '../functions/shapirowilk-test';

const DistributionStatsPage = (props) => {

    let dataArray = []

    const getYChartValues = (data) => {
        for (let i = 0; i < data.length; i++) {
            dataArray.push(data[i].occurance)           
        }
    }

    getYChartValues(props.data);
    const stest = ShapiroWilkW(dataArray)
    const isDataNormal = checkNormality(stest, dataArray.length)
    //console.log(stest)
    //console.log(checkNormality(stest, dataArray.length))

    return(
        <View style={styles.statistics}>
            <View style={styles.statTitle}>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>Histogram błędów({props.chartType}) {props.data.length}</Text>
            </View>
            <View style={styles.statTitle}>
                <TouchableOpacity onPress={props.onSeasonChange}>
                    <FontAwesome name='arrow-left' size={22} color="#ed2929"></FontAwesome>
                </TouchableOpacity>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>{props.seasonText}</Text>
                <TouchableOpacity onPress={props.onSeasonChange}>
                    <FontAwesome name='arrow-right' size={22} color="#ed2929"></FontAwesome>
                </TouchableOpacity>
            </View>
            <View style={styles.statTitle}>
                <Text>Test Shapiro-Wilka</Text>
            </View>
            {isDataNormal ?<View style={styles.statTitle}>
                <Text style={{textAlign: 'center'}}>Na poziomie istotności 5% oraz próbce danych n = {props.data.length} można uznać, że próbka pochodzi z rozkładu normalnego</Text>
            </View> :
            <View style={styles.statTitle}>
                <Text style={{textAlign: 'center'}}>Na poziomie istotności 5% oraz próbce danych n = {props.data.length} nie można uznać, że próbka pochodzi z rozkładu normalnego</Text>
            </View>
            }
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
})

export default DistributionStatsPage;