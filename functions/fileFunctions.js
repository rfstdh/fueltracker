//bunch of useful functions

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as Sharing from 'expo-sharing';

import * as dbFunctions from '../database/connection';

//opening and parsing file
export const openFile = async() => {
    
    //remove current database and override it with loaded data
    await dbFunctions.dropDatabase();
    await dbFunctions.init();
    await DocumentPicker.getDocumentAsync()
    .then(async (resolve)=>{
        await FileSystem.readAsStringAsync(resolve.uri).then((res)=>{parseData(res); return 0;}).catch(err=>console.log(err))          
    })
    .catch(err=>console.log(err))

}

//parsing from CSV to JSON
export const parseData = (data) => { 
    //console.log(data);
    console.log('here');
    var newArray = [];
    
    var lines = data.split('\r');
    console.log(lines.length);
    
    for (let i = 0; i < lines.length; i++) {
        const elements = lines[i].split(',');
        
        if(typeof elements[0]!=='undefined' &&  typeof elements[1]!=='undefined' && i!=0){
            dbFunctions.addToDatabase(parseFloat(elements[0]), parseFloat(elements[1]), parseInt(elements[2]), elements[3], elements[4],elements[5]); 
        }
    }
    return 0;
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
    //init line
    let initLine = "Zużycie,CPU Zużycie,Stan licznika,Rodzaj trasy,Data tankowania,Uwagi\r";
    allCsv+=initLine;
    data.forEach(element => {
        let line = element.usage + "," + element.cpuUsage + "," + element.kilometersDriven + "," + element.trackType + "," +  element.date + "," + element.comments + '\r';
        allCsv+=line;
    });
    //console.log(allCsv);
    return allCsv;
}