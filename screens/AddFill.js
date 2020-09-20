import React,{useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';

import {View,Text,StyleSheet,TextInput,Button, ScrollView, SafeAreaView, TouchableOpacity, Platform, Picker} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import * as fillActions from '../store/actions/fillActions';
import * as dbFunctions from '../database/connection';
import * as dbActions from '../store/actions/dbActions';



const AddFill = (props) => {
    
    const [fillText,setFillText] = useState();
    const [cpuFillText,setCpuFillText] = useState();
    const [kilometersDriven,setKilometersDriven] = useState();
    const [trackType,setTrackType] = useState('m');
    const [fillDate,setFillDate] = useState();
    const [showDate,setShowDate] = useState(false);
    const [comments,setComments] = useState();
    const [showPicker,setShowPicker] = useState(false);
    
    const dispatch = useDispatch();
    const date = useSelector(state=>state.fill.fillDate);

    return(
        <View style={styles.wrapper}>
        <ScrollView>
        <View style={styles.container}>
            <Text>Usage</Text>
            <View style={styles.fillView}>
            <TextInput style={styles.input} value={fillText} onChangeText={(text)=>setFillText(text)}></TextInput>
            </View>
            
            <Text>CPU Usage</Text>
            <View style={styles.fillView}>
            <TextInput style={styles.input} value={cpuFillText} onChangeText={(text)=>setCpuFillText(text)}></TextInput>
            </View>
            
            <Text>Kilometers since last fill</Text>
            <View style={styles.fillView}>
            <TextInput style={styles.input} value={kilometersDriven} onChangeText={(text)=>setKilometersDriven(text)}></TextInput>
            </View>
            
            {/* <Text>Fill Date</Text>
            {Platform.OS === 'ios' ? <TouchableOpacity style={{alignItems: 'center', width: '100%', margin: 40}} onPress={()=>{props.navigation.navigate('Date')}}>
                {date ? <Text>{date.toString()}</Text> : <Text>Pick a date</Text>}
            </TouchableOpacity>  
            
            : <TouchableOpacity style={{alignItems: 'center', width: '100%', margin: 40}} onPress={()=>{setShowDate(true)}}>
                {fillDate ? <Text>{fillDate.toString()}</Text> : <Text>Pick a date</Text>}
                {showDate ? <DateTimePicker value={fillDate ? fillDate : new Date()} onChange={(e,value)=>{setShowDate(false); setFillDate(value)}}></DateTimePicker> : null}
            </TouchableOpacity> }        */}
            
            <Text>Fill Date</Text>
            <Text style={{margin: 40, fontWeight: 'bold'}} onPress={()=>{setShowPicker(!showPicker)}}> {fillDate ? fillDate.toString() : 'Pick a date'}</Text>
            <DateTimePickerModal
                isVisible={showPicker}
                mode="date"
                onConfirm={(value)=>{console.log('confirmed'); setShowPicker(false); setFillDate(value)}}
                onCancel={()=>{}}
            />    
                                 
            <Text>Track Type</Text>
            {/* <Text style={{fontWeight: 'bold'}}>{trackType}</Text> */}
            <View style={styles.trackView}>                   
                <RNPickerSelect
                    onValueChange={(value) => { console.log(trackType);setTrackType(value);}}
                    placeholder={{}}
                    style={{inputIOS: {textAlign: 'center'}}}
                    items={[
                        { label: 'City', value: 'm' },
                        { label: 'Road', value: 't' },
                        { label: 'Highway', value: 'a' },
                    ]}
                />
            </View>
            
            <Text>Comments</Text>
            <View style={styles.fillView}>
            <TextInput style={styles.commentStyle} value={comments} multiline onChangeText={(text)=>setComments(text)}></TextInput>
            </View>
                

            <View style={styles.button}>
                <Button title="ADD" onPress={()=>{dbFunctions.addToDatabase(parseFloat(fillText), parseFloat(cpuFillText), parseInt(kilometersDriven), trackType,fillDate.toString(), comments).
                    then(res=>{console.log(res); dispatch(dbActions.fetchData())}).catch(err=>console.log(err));}}/>
            </View>
        </View>
        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        flex: 1
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    fillView:{
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'center',
        width: '40%',
    },
    trackView:{
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%'
    },
    commentStyle:{
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center',
        width: '100%',
        borderColor: '#ccc',
        borderRadius: 2,
        borderWidth: 2
    },
    input:{
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        width: '40%',
        textAlign: 'center'
    },
    button:{
        marginTop: 20,
    }
})


export default AddFill;