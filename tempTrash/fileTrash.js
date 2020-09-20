//bunch of useful functions

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as Sharing from 'expo-sharing';

import { documentDirectory } from 'expo-file-system';

import {Platform} from 'react-native';

//opening and parsing file
export const openFile = async() => {
    
    var data = [];

    await DocumentPicker.getDocumentAsync()
    .then(async (resolve)=>{
        data = await FileSystem.readAsStringAsync(resolve.uri).then((res)=>{var x = parseData(res); return x;}).catch(err=>console.log(err))          
    })
    .catch(err=>console.log(err))

    return data;
}

//parsing from CSV to JSON
export const parseData = (data) => { 
    //console.log(data);
    console.log('here');
    var redArray = [];
    var greenArray = [];
    var yellowArray = [];
    
    var lines = data.split('\r');
    console.log(lines.length)
    
    for (let i = 0; i < lines.length; i++) {
        const elements = lines[i].split(',');
        
        if(typeof elements[0]!=='undefined' &&  typeof elements[1]!=='undefined'){
            //console.log(elements[0],elements[1],elements[2]);
            if(elements[2]==='m'){
                //console.log('red')
                redArray.push({quarter: parseFloat(elements[0]), earnings: parseFloat(elements[1]), type: elements[2]}); 
            }
            else if(elements[2]==='t'){
                greenArray.push({quarter: parseFloat(elements[0]), earnings: parseFloat(elements[1]),type: elements[2]}); 
            }
            else if(elements[2]==='a'){
                yellowArray.push({quarter: parseFloat(elements[0]), earnings: parseFloat(elements[1]),type: elements[2]}); 
            }
        }
    }
    return [redArray,greenArray,yellowArray];
}


//saving a file - ANDROID ONLY
export const saveFile = async (saveData) => {
    
    //need permissions in order to save a file
    const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if(status==='granted'){
        
        console.log('saving');       
        let fileUri = FileSystem.documentDirectory + "wykres.csv";
        //console.log(fileUri);
        let csvtoSave = makeCsv(saveData);
        
        await FileSystem.writeAsStringAsync(fileUri, csvtoSave, { encoding: FileSystem.EncodingType.UTF8});
        
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync("Wykresy", asset);
        
        //delete from unknown depth of unseen files
        await FileSystem.deleteAsync(fileUri);      
    }
}

//share a file - iOS/ANDROID
export const shareFile = async (saveData) => {
    
    console.log('sharing');        
    let fileUri = FileSystem.documentDirectory + "wykres.csv";
    let csvtoSave = makeCsv(saveData);
    
    //temporary save to phone storage just to have hook on next line
    await FileSystem.writeAsStringAsync(fileUri, csvtoSave, { encoding: FileSystem.EncodingType.UTF8});
    
    await Sharing.shareAsync(fileUri)
    
    //delete from unknown depth of unseen files
    await FileSystem.deleteAsync(fileUri);
}

//making CSV from JSON
export const makeCsv = (data) => {
    var allCsv = '';
    data.forEach(element => {
        let line = element.quarter + "," + element.earnings + "," + element.type + '\r';
        allCsv+=line;
    });
    //console.log(allCsv);
    return allCsv;
}



const loadChart = async () => {
    var r,g,y;
    [r,g,y] = await fileFunctions.openFile();
    // console.log(y)
    dispatch(fileActions.addRedFileData(r));
    dispatch(fileActions.addGreenFileData(g));
    dispatch(fileActions.addYellowFileData(y));
}
  

const saveChart = () => {
  var allData = [];
  allData = allData.concat(redData);
  allData = allData.concat(greenData);
  allData = allData.concat(yellowData);
  //console.log(allData);
  fileFunctions.saveFile(allData);
}

const shareChart = () => {
  var allData = [];
  allData = allData.concat(redBlurData);
  allData = allData.concat(greenBlurData);
  allData = allData.concat(yellowBlurData);
  fileFunctions.shareFile(allData);
}