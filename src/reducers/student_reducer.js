import {
    ADD_RECORD,
    ADD_ERROR,
    DEL_RECORD,
    FILTER_RECORDS,
    UPD_RECORD,
    RETR_RECORDS,
    RESET_ERRS,

} from '../actions/type';
const defaultState = {all:[], error: null, loading: true};

export default function(state = defaultState, action){
    switch (action.type){
        case ADD_RECORD:
            return {...state, add: action.payload};
        case ADD_ERROR:
            return {...state,error: true };
        case RETR_RECORDS:
            console.log('retrieve reduce',action.payload);
            return {all: action.payload};
        case UPD_RECORD:
            return {...state, upd: action.payload};
        case DEL_RECORD:
            return {...state, del: action.payload};
        case RESET_ERRS:
            return{...state, error: action.payload};
        default:
            return state;
    }
}