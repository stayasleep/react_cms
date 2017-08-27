import {
    ADD_RECORD,
    ADD_ERROR,
    DEL_RECORD,
    DEL_ERRS,
    UPD_RECORD,
    UPD_ERRS,
    RETR_RECORDS,
    RESET_ERRS,
    FILTER_RECORDS,
} from './type';
import axios from 'axios';

// const BASE_URL = "../data.php?action=";//works if you use the build html file
const BASE_URL = "http://localhost:8080/react_cms/data.php?action="; //cross origin issues perhaps
// const BASE_URL = "http://localhost:3000/data.php?action=";
// const BASE_URL = "/react_cms/data.php?action=";

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
    return function (dispatch){
        axios.post(`${BASE_URL}insert`,entry ).then((response) => {
            console.log('response back',response);
            if(response.data.success){
                dispatch({
                    type: ADD_RECORD,
                    payload: true,
                })
            }else if(!response.data.success){
                dispatch({
                    type: ADD_ERROR,
                    payload: response.data.errors
                })
            }
        }).catch((err) => {
            console.log('is add err',err);
        })
    }
}

//this function should be fired off upon load
//and should be used every time you C/U/D
export function retrieveAll(){
    return function(dispatch){
        axios.post(`${BASE_URL}readAll`).then((response) => {
            console.log('retrieve all axios',response);
            if(response.data.success){
                dispatch({
                    type: RETR_RECORDS,
                    payload: response.data.data,
                })
            }
        })
    }
}

export function updateEntry(updateObj){
    return function(dispatch) {
        axios.post(`${BASE_URL}update`, updateObj).then((response) => {
            console.log('resp ax up',response);
            if(response.data.success){
                dispatch({
                    type: UPD_RECORD,
                    payload: response.data.success,
                })
            }else{
                dispatch({
                    type: UPD_ERRS,
                    payload: response.data.errors,
                })
            }
        })
    }
}

export function deleteEntry(id){
    return function(dispatch){
        axios.post(`${BASE_URL}delete`, id).then((response) => {
            console.log('response delete',response);
            if(response.data.success){
                dispatch({
                    type: DEL_RECORD,
                    payload:response.data.success,
                })
            }else{
                dispatch({
                    type: DEL_ERRS,
                    payload: response.data.errors
                })
            }
        })
    };

}

export function resetErrors(){
    return{
        type: RESET_ERRS,
        payload: null,
    }
}