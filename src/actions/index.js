import {
    ADD_RECORD,
    DEL_RECORD,
    UPD_RECORD,
    RETR_RECORDS,
    FILTER_RECORDS,
} from './type';
import axios from 'axios';
const BASE_URL = "../data.php?action=";
// const BASE_URL = "http://localhost:8080/react_cms/data.php?action=";

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
export function addRecord(entry){
    console.log('add record',entry);
    return function (dispatch){
        axios.post(`${BASE_URL}insert`, entry).then((response) => {
            console.log('response back',response);
        }).catch((err) => {
            console.log('is err',err);
        })
    }
}

//this function should be fired off upon load
//and should be used every time you C/U/D
export function retrieveAll(){
    return function(dispatch){
        axios.post(`${BASE_URL}readAll`).then((response) => {
            console.log('retrieve all ax',response);
            if(response.data.success){
                dispatch({
                    type: RETR_RECORDS,
                    payload: response.data.data,
                })
            }
        })
    }
}

export function updateEntry(entry){
    return{
        type: UPD_RECORD,
        payload: entry,
    }
}

export function deleteEntry(id){
    return function(dispatch){
        axios.post(`${BASE_URL}delete`, id).then((response) => {
            console.log('response delete',response);
        })
    };

}