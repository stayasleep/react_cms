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
// const BASE_URL = "http://localhost:8080/react_cms/data.php?action="; //testing
const BASE_URL = "../../data.php?action=";

export function addRecord(entry){
    return function (dispatch){
        axios.post(`${BASE_URL}insert`,entry ).then((response) => {
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
            //network connectivity goes here
        })
    }
}

//this function should be fired off upon load
export function retrieveAll(){
    return function(dispatch){
        axios.post(`${BASE_URL}readAll`).then((response) => {
            if(response.data.success){
                dispatch({
                    type: RETR_RECORDS,
                    payload: response.data.data,
                })
            }else if(response.data.errors[0] === "no data"){
                dispatch({
                    type: RETR_RECORDS,
                    payload: [],
                })
            }
        }).catch((err) => {
            //handle network connectivity issues here
        })
    }
}

export function updateEntry(updateObj){
    return function(dispatch) {
        axios.post(`${BASE_URL}update`, updateObj).then((response) => {
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
/**
 * @name resetErrors
 * @description resets the state error to null, in case more errors require notification
 * @returns action type and payload
 * **/
export function resetErrors(){
    return{
        type: RESET_ERRS,
        payload: null,
    }
}