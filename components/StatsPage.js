import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StatsPage = (props) => {

    return(
        <View style={styles.statistics}>
            <View style={styles.statTitle}>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>Statystyki i legenda</Text>
            </View>
            <View style={styles.statRowContainer}>
                <View style={styles.statRow}>
                    <View style={styles.statIcon}>
                        <MaterialCommunityIcons name='gas-station' size={48} color={props.chartColor}/>
                    </View>
                    <View style={styles.statInfo}>
                        <Text style={{fontWeight: 'bold'}}>Średnie zużycie</Text>                   
                    </View>
                </View>
                <View style={styles.statRow}>
                    <View style={styles.statIcon}>
                    <MaterialCommunityIcons name='gas-station' size={48} color={props.chartBlurColor}/>
                    </View>
                    <View style={styles.statInfo}>
                        <Text style={{fontWeight: 'bold'}}>Średnie zużycie (rozmyte)</Text>
                    </View>
                </View>
            </View>
            <View style={styles.statRowContainer}>
                <View style={styles.statRow}>
                    <View style={styles.statIcon}>
                        <MaterialCommunityIcons name='fire' size={48} color="#ff7034"/>
                    </View>
                    <View style={styles.statInfo}>
                        <Text style={{fontWeight: 'bold'}}>Średnie spalanie</Text>
                        <Text>6.44 l/100km</Text>                   
                    </View>
                </View>
                <View style={styles.statRow}>
                    <View style={styles.statIcon}>
                    <MaterialCommunityIcons name='fire' size={48} color="#ff7034"/>
                    </View>
                    <View style={styles.statInfo}>
                        <Text style={{fontWeight: 'bold'}}>Średnie spalanie (rozmyte)</Text>
                        <Text>6.44 l/100km</Text> 
                    </View>
                </View>
            </View>
            <View style={styles.statRowContainer}>
                <View style={styles.statRow}>
                    <View style={styles.statIcon}>
                        <MaterialCommunityIcons name='road' size={48} color="#ccc"/>
                    </View>
                    <View style={styles.statInfo}>
                        <Text style={{fontWeight: 'bold'}}>Rodzaj trasy</Text>    
                        <Text>{props.topChart}</Text>                               
                    </View>
                </View>
                <View style={styles.statRow}>
                    <View style={styles.statIcon}>
                    <MaterialCommunityIcons name='barrel' size={48} color="#ccc"/>
                    </View>
                    <View style={styles.statInfo}>
                        <Text style={{fontWeight: 'bold'}}>Pomiary</Text>
                        <Text>21</Text>
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
        justifyContent: 'center',
        width: '100%',
        marginVertical: 10,
        alignItems: 'center',
        textAlign: 'center'
    },
    statRow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '50%',
        marginVertical: 10,
    },
    statIcon:{
        width: '30%',
    },
    statInfo:{
        width: '70%'
    }
})

export default StatsPage;