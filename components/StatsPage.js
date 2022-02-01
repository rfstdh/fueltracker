import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StatsPage = (props) => {

    return(
        <View style={styles.statistics}>
            <View style={styles.statTitle}>
                <Text style={{fontWeight: 'bold', fontSize: 17}}>Statystyki i legenda ({props.titleText})</Text>
                <TouchableOpacity onPress={props.onClick}>
                    <FontAwesome name='exchange-alt' size={22} color="#ed2929"></FontAwesome>
                </TouchableOpacity>

                {/* changing visibility of mixed fills */}
                <TouchableOpacity onPress={props.onMixedClick}>
                    <MaterialCommunityIcons name='eye-settings' size={22} color="#ed2929"/>
                </TouchableOpacity>
               
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
                        <Text style={{fontWeight: 'bold'}}>Rzeczywiste zużycie</Text>
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
                        <Text>{props.avg} l/100km</Text>                   
                    </View>
                </View>
                <View style={styles.statRow}>
                    <View style={styles.statIcon}>
                    <MaterialCommunityIcons name='fire' size={48} color="#ff7034"/>
                    </View>
                    <View style={styles.statInfo}>
                        <Text style={{fontWeight: 'bold'}}>Moda</Text>
                        <Text>{props.mode} l/100km</Text> 
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
                        <Text>{props.length}</Text>
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