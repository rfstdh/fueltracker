import React,{useState} from 'react';
import {View,Button} from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

import {VictoryChart, VictoryBar} from 'victory-native';

const LoadFile = () => {
    
    const [plotData,setPlotData] = useState([]);

    const status = Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    const fileFunc = () => {
        DocumentPicker.getDocumentAsync()
        .then(async (resolve)=>{
            console.log("numer1")
            console.log(resolve);
            FileSystem.readAsStringAsync(resolve.uri).then(res=>{console.log("numer2");console.log(res)}).catch(err=>console.log(err))          
        })
        .catch(err=>console.log(err))
    }
    
    const parseData = (data) => {
        console.log("numer3",data);
        console.log('here');
        var lines = data.split('\n');
        var newArray = [];
        console.log(lines.length)
        for (let i = 0; i < lines.length; i++) {
            const elements = lines[i].split(';');
            if(elements[0]!=='' && elements[1]!=='')newArray.push({quarter: parseFloat(elements[0]), earnings: parseFloat(elements[1])}); 
        }
        setPlotData(newArray);
    }
   
    plotData.sort((a,b) => {return a.quarter > b.quarter})

    const addData = () => {
        var newplotData = plotData;
        newplotData.push({quarter:9, earnings: 4})
        setPlotData(newplotData)
        console.log(newplotData);
    }

    const makeCsv = (data) => {
        var allCsv = '';
        data.forEach(element => {
            let line = element.quarter + ";" + element.earnings + ';\n';
            allCsv+=line;
        });
        console.log(allCsv);
        return allCsv;
    }


    const saveFile = async () => {
        
        let fileUri = FileSystem.documentDirectory + "wykres.csv";
        let csvtoSave = makeCsv(plotData);
        await FileSystem.writeAsStringAsync(fileUri, csvtoSave, { encoding: FileSystem.EncodingType.UTF8});
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Wykresy", asset)
        
        //MediaLibrary.createAlbumAsync('Wykresy',asset).then(resolve=>{console.log(resolve);MediaLibrary.getAlbumAsync('Wykresy').then(res=>console.log(res))})
        //FileSystem.writeAsStringAsync(documentDirectory);
        console.log(FileSystem.documentDirectory);
        
    }

    return(
        <View>
            <Button title="Open document" onPress={fileFunc} />
            {/* <Text>{plotData}</Text> */}
            <VictoryChart>
                <VictoryBar data={plotData} x="quarter" y="earnings"/>
            </VictoryChart>
            <Button title="Add" onPress={addData} />
            <Button title="Save" onPress={saveFile} />
        </View>
    )
}


export default LoadFile;