import React,{useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import {View,Text,StyleSheet} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import * as fillActions from '../../store/actions/fillActions';

const DatePickerScreen = () => {
    
    const [date,setDate] = useState(new Date());
    const dispatch = useDispatch();
    return(
        <View>
            <Text>Pick a date</Text>
            <DateTimePicker
                value={date}
                onChange={(e,value)=>{setDate(value); dispatch(fillActions.setFillDate(value))}}>
                
            </DateTimePicker>
        </View>
    );
}

const styles = StyleSheet.create({
    
})

export default DatePickerScreen;