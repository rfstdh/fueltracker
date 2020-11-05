import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomHeaderButton = (props) => {
    return(
        <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={24} color='#ed2929'/>
    )
}   


export default CustomHeaderButton;
