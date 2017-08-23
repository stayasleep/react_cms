import {
    ADD_RECORD,
    DEL_RECORD,
    FILTER_RECORDS,
    UPD_RECORD,
    RETR_RECORDS,

} from '../actions/type';
const defaultState = {all:[], error: null};

export default function(state = defaultState, action){
    switch (action.type){
        case ADD_RECORD:
            return {...state, add: action.payload};
        case RETR_RECORDS:
            console.log('retrieve reduce',action.payload);
            return {all: action.payload};
        case UPD_RECORD:
            return {...state, upd: action.payload};
        case DEL_RECORD:
            return {...state, del: action.payload};
        default:
            return state;
    }
}