import React,{useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';

import {View,Text,StyleSheet,TextInput,Button, ScrollView, SafeAreaView, TouchableOpacity, Platform, Picker, KeyboardAvoidingView} from 'react-native';

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
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.container}>
            <View style={styles.fillView}>
                <View style={styles.textContainer}>
                    <Text style={styles.inputText}>Zużycie</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput maxLength={4} selection={{start: fillText ? fillText.length : 0, end:fillText ? fillText.length : 0}} keyboardType='decimal-pad' style={styles.input} value={fillText} onChangeText={(text)=>setFillText(text)} placeholder='0.00L'></TextInput>
                    <Text style={{fontSize: 20, margin:0, fontWeight: 'bold'}}>{typeof fillText !== 'undefined' && fillText!=''? 'L/100KM' : null}</Text>
                </View>
            </View>
            
            <View style={styles.fillView}>
                <View style={styles.textContainer}>
                    <Text style={styles.inputText}>Zużycie wg CPU</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput maxLength={4} selection={{start: cpuFillText ? cpuFillText.length : 0, end:cpuFillText ? cpuFillText.length : 0}} keyboardType='decimal-pad' style={styles.input} value={cpuFillText} onChangeText={(text)=>setCpuFillText(text)} placeholder='0.00L'></TextInput>
                    <Text style={{fontSize: 20, margin:0, fontWeight: 'bold'}}>{typeof cpuFillText !== 'undefined' && cpuFillText!=''? 'L/100KM' : null}</Text>
                </View>          
            </View>
            
            <View style={styles.fillView}>
                <View style={styles.textContainer}>
                    <Text style={styles.inputText}>Przebieg</Text>
                </View>
                <View style={styles.inputContainer}>
                <TextInput maxLength={10} selection={{start: kilometersDriven ? kilometersDriven.length : 0, end:kilometersDriven ? kilometersDriven.length : 0}} keyboardType='numeric' style={styles.input} value={kilometersDriven} onChangeText={(text)=>setKilometersDriven(text)} placeholder='0KM'></TextInput>
                    <Text style={{fontSize: 20, margin:2, fontWeight: 'bold'}}>{typeof kilometersDriven !== 'undefined' && kilometersDriven!=''? 'KM' : null}</Text>
                </View> 
            
            </View>
            
            <View style={styles.pickerView}>
                <View style={styles.twoFillView}>
                <Text style={{fontWeight: 'bold', textAlign: 'center', marginTop: 10}}>Data tankowania</Text>  
                    <Text style={{marginVertical: 15,textAlign: 'center'}} onPress={()=>{setShowPicker(!showPicker)}}> {fillDate ? fillDate.toString() : 'Wybierz'}</Text>
                    <DateTimePickerModal
                        isVisible={showPicker}
                        mode="date"
                        onConfirm={(value)=>{
                            let date = '';
                            date = value.getDate() + '-' + (value.getMonth() + 1) + '-' + value.getFullYear();
                            console.log('confirmed'); 
                            setShowPicker(false); 
                            setFillDate(date)}}
                        onCancel={()=>{setShowPicker(!showPicker);}}
                    />    
                </View>  
                <View style={styles.twoFillView}>            
                <Text style={{fontWeight: 'bold', textAlign: 'center', marginTop: 10}}>Rodzaj trasy</Text>  
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
                </View>
            </View>

                            
            <View style={styles.commentView}>
                <Text style={{fontWeight: 'bold', textAlign: 'center', marginVertical: 5}}>Uwagi</Text>
                <TextInput maxLength={100} style={styles.commentStyle} value={comments} multiline onChangeText={(text)=>setComments(text)} placeholder="Wpisz uwagi..."></TextInput>
            </View>
            

            <View style={styles.button}>
                <Button title="ADD" onPress={()=>{dbFunctions.addToDatabase(parseFloat(fillText), parseFloat(cpuFillText), parseInt(kilometersDriven), trackType,fillDate.toString(), comments).
                    then(res=>{console.log(res); dispatch(dbActions.fetchData())}).catch(err=>console.log(err));}}/>
            </View>
        </View>
        </KeyboardAvoidingView>
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
        width: '80%',
        backgroundColor: '#fff',
        minHeight: 70,
        elevation: 6,
        borderRadius: 5
    },
    twoFillView:{
        marginVertical: 20,
        width: '45%',
        backgroundColor: '#fff',
        minHeight: 70,
        elevation: 6,
        borderRadius: 5
    },
    pickerView:{
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    commentView:{
        marginVertical: 20,
        width: '80%',
        backgroundColor: '#fff',
        minHeight: 70,
        elevation: 6,
        borderRadius: 5,
    },
    textContainer:{
        width: '40%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 5,
        paddingHorizontal: 5,
    },
    inputText:{
        fontWeight: 'bold',
        fontSize: 16
    },
    smallText:{
        fontSize: 12
    },
    inputContainer:{
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    trackView:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex:1,
    },
    commentStyle:{
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center',
        flex:1,
    },
    input:{
        textAlign: 'right',
        fontSize: 20,
        paddingHorizontal: 2,
        minWidth: 80
    },
    button:{
        marginTop: 20,
    }
})


export default AddFill;