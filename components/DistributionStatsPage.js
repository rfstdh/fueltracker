import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DistributionStatsPage = (props) => {

    return(
        <View style={styles.statistics}>
            <View style={styles.statTitle}>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>Histogram błędów({props.chartType})</Text>
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