export const ADD_TO_DATABASE = 'ADD_TO_DATABASE';
export const FETCH_FROM_DATABASE = 'FETCH_FROM_DATABASE';

import {fetchFromDatabase} from '../../database/connection';

export const fetchData =  () => {
       return async dispatch  => {  
              await fetchFromDatabase().then(res=>{try{
                     dispatch( {
                            type: FETCH_FROM_DATABASE,
                            fillsArray: res.rows._array
                     })
              }
                     catch(err){
                            console.log(err)
                     }}) 
             
       }
}
