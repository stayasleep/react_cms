import {
    ADD_RECORD,
    ADD_ERROR,
    DEL_RECORD,
    DEL_ERRS,
    FILTER_RECORDS,
    UPD_RECORD,
    UPD_ERRS,
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
            return {all: action.payload};
        case UPD_RECORD:
            return {...state, upd: action.payload};
        case UPD_ERRS:
            return {...state, error: true};
        case DEL_RECORD:
            return {...state, del: action.payload};
        case DEL_ERRS:
            return {...state, error: true};
        case RESET_ERRS:
            return{...state, error: action.payload};
        default:
            return state;
    }
}