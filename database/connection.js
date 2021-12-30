import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
//open, or if for the first time, create database

const db = SQLite.openDatabase('tankowania.db');

//initialize database at app start or when loading from file
export const init = () => {
    const db = SQLite.openDatabase('tankowania.db');
    console.log('init')
    const promise = new Promise((resolve,reject) => {
    
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS pomiary (id INTEGER PRIMARY KEY NOT NULL, usage REAL NOT NULL, cpuUsage REAL NOT NULL, usageError REAL NOT NULL, kilometersDriven INTEGER NOT NULL, trackType TEXT NOT NULL, date TEXT NOT NULL, comments TEXT);',
            [],
            (_,result)=>{resolve(result);},
            (_,err)=>{reject(err);})
        })
    })

    return promise;

}

//add new record to the database
export const addToDatabase = (fillText, cpuFillText, usageError, kilometersDriven, trackType,fillDate, comments) => {
    const db = SQLite.openDatabase('tankowania.db');
    console.log('add')
    const promise = new Promise((resolve,reject) => {
    
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO pomiary (usage, cpuUsage, usageError, kilometersDriven, trackType, date, comments) VALUES (?,?,?,?,?,?,?);',
            [fillText, cpuFillText, usageError, kilometersDriven, trackType,fillDate, comments],
            (_,result)=>{resolve(result);},
            (_,err)=>{reject(err);})
        })
    })

    return promise;
}

//get all records from database
export const fetchFromDatabase = () => {
    const db = SQLite.openDatabase('tankowania.db');
    console.log('fetch')
    const promise = new Promise((resolve,reject) => {
    
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM pomiary;',
            [],
            (_,result)=>{resolve(result);},
            (_,err)=>{reject(err);})
        })
    })
    return promise;
}

//remove one record from database
export const removeFromDatabase = (itemId) => {
    const db = SQLite.openDatabase('tankowania.db');
    console.log('delete')
    const promise = new Promise((resolve,reject) => {
    
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM pomiary WHERE id=?;',
            [itemId],
            (_,result)=>{resolve(result);},
            (_,err)=>{reject(err);})
        })
    })
    return promise;
}

//remove whole table, REMEMBER TO INIT IT AGAIN
export const dropDatabase = () => {
    const db = SQLite.openDatabase('tankowania.db');
    console.log('drop database')
    const promise = new Promise((resolve,reject) => {
    
        db.transaction((tx) => {
            tx.executeSql('DROP TABLE IF EXISTS pomiary',
            [],
            (_,result)=>{resolve(result);},
            (_,err)=>{reject(err);})
        })
    })
    return promise;
}

//only for testing purposes, saving .db file won't be supported in production
export const saveDb = async () => {
    //need permissions in order to save a file     
    console.log('saving db');
    // const x = await FileSystem.readDirectoryAsync(
    //     `${FileSystem.documentDirectory}SQLite/tankowania`
    // )
    // console.log(x)
    // const x = await FileSystem.getInfoAsync(FileSystem.documentDirectory).then(async (res)=>{
    //     console.log(res)
    //     console.log(FileSystem.documentDirectory + 'SQLite/tankowania.db')
    //     const asset = await MediaLibrary.createAssetAsync(FileSystem.documentDirectory + 'tankowania.db').catch(err=>console.log(err));
    //     await MediaLibrary.createAlbumAsync("BazaDanych", asset).then(res=>console.log(res)).catch(err=>console.log(err));
    // }
        
    // ).catch(err=>console.log(err));
    
//    await FileSystem.readAsStringAsync(uri).then(res=>console.log(res));

    //only this works
    await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/tankowania.db')
}

