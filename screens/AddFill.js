import React,{useState} from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';

import {View,Text,StyleSheet,TextInput,ScrollView} from 'react-native';
import MyButton from '../components/MyButton';

import {useDispatch, useSelector} from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as dbFunctions from '../database/connection';
import * as dbActions from '../store/actions/dbActions';

import * as validateFunctions from '../functions/validateFunctions';

const AddFill = (props) => {
    
    const [fillText,setFillText] = useState();
    const [cpuFillText,setCpuFillText] = useState();
    const [kilometersDriven,setKilometersDriven] = useState();
    const [trackType,setTrackType] = useState('m');
    const [fillDate,setFillDate] = useState();
    const [comments,setComments] = useState();
    const [showPicker,setShowPicker] = useState(false);
    
    const dispatch = useDispatch();


    const sendForm = () => {
        dbFunctions.addToDatabase(parseFloat(fillText), parseFloat(cpuFillText), parseFloat(cpuFillText) - parseFloat(fillText), parseInt(kilometersDriven), trackType,fillDate.toString(), comments).
        then(res=>{console.log(res); dispatch(dbActions.fetchData())}).catch(err=>console.log(err));
    }

    return(
        <View style={styles.wrapper}>
        <KeyboardAwareScrollView>
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.fillView}>
                <View style={styles.textContainer}>
                    <Text style={styles.inputText}>Zużycie</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput maxLength={4} 
                               selection={{start: fillText ? fillText.length : 0, end:fillText ? fillText.length : 0}} 
                               keyboardType='decimal-pad' 
                               style={styles.input} 
                               value={fillText} 
                               onChangeText={(text)=>{
                                   let newText = validateFunctions.validateUsage(text);
                                   setFillText(newText);
                               }} 
                               placeholder='0.0L'>                                  
                    </TextInput>
                    <Text style={{fontSize: 20, margin:0, fontWeight: 'bold'}}>{typeof fillText !== 'undefined' && fillText!=''? 'L/100KM' : null}</Text>
                </View>
            </View>
            
            <View style={styles.fillView}>
                <View style={styles.textContainer}>
                    <Text style={styles.inputText}>Zużycie wg CPU</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput maxLength={4} 
                               selection={{start: cpuFillText ? cpuFillText.length : 0, end:cpuFillText ? cpuFillText.length : 0}} 
                               keyboardType='decimal-pad' 
                               style={styles.input} 
                               value={cpuFillText} 
                               onChangeText={(text)=>{
                                let newText = validateFunctions.validateUsage(text);
                                setCpuFillText(newText);
                            }}
                               placeholder='0.0L'>                                  
                    </TextInput>
                    <Text style={{fontSize: 20, margin:0, fontWeight: 'bold'}}>{typeof cpuFillText !== 'undefined' && cpuFillText!=''? 'L/100KM' : null}</Text>
                </View>          
            </View>
            
            <View style={styles.fillView}>
                <View style={styles.textContainer}>
                    <Text style={styles.inputText}>Przebieg</Text>
                </View>
                <View style={styles.inputContainer}>
                <TextInput maxLength={8} 
                           selection={{start: kilometersDriven ? kilometersDriven.length : 0, end:kilometersDriven ? kilometersDriven.length : 0}} 
                           keyboardType='decimal-pad' 
                           style={styles.input} 
                           value={kilometersDriven} 
                           onChangeText={(text)=>{
                            let newText = validateFunctions.validateMileage(text);   
                            setKilometersDriven(newText)
                           }} 
                           placeholder='0KM'>                            
                </TextInput>
                <Text style={{fontSize: 20, margin:0, fontWeight: 'bold'}}>{typeof kilometersDriven !== 'undefined' && kilometersDriven!=''? 'KM' : null}</Text>
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
                            style={{inputIOS: {textAlign: 'center'}, done: {color: 'red'}, chevronActive:{color: 'red'}}}
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
                <TextInput maxLength={100} 
                           style={styles.commentStyle} 
                           value={comments} 
                           multiline 
                           onChangeText={(text)=>{
                               let newText = validateFunctions.validateComments(text)
                               setComments(newText)
                           }} 
                           placeholder="Wpisz uwagi...">
                </TextInput>              
            </View>

                

            <View style={styles.button}>
                <MyButton title="Dodaj" onClick={sendForm} color={{backgroundColor: '#ed2929'}}></MyButton>
            </View>
        </View>
        </ScrollView>
        </KeyboardAwareScrollView>
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
    },
    input:{
        textAlign: 'right',
        fontSize: 20,
        paddingHorizontal: 2,
        minWidth: 80
    },
    button:{
        marginVertical: 20,
        width: '80%',
    },
})


export default AddFill;