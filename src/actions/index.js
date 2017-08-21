import {
    ADD_RECORD,
    DEL_RECORD,
    UPD_RECORD,
    RETR_RECORDS,
    FILTER_RECORDS,
} from './type';

//axios to send object to the database
//using mysql, the response will only alert if the row was inserted or not
//need a follow up axios call to retrive all from db
export function addStudent(entry){
    console.log('add', entry);
    return{
        type: ADD_RECORD,
        payload: entry,
    }
}

//this function should be fired off upon load
//and should be used every time you C/U/D
export function retrieveAll(){

}

export function updateEntry(){

}

export function deleteEntry(entry){
    return{
        type: DEL_RECORD,
        payload: entry,
    }
}