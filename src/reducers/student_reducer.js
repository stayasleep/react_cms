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
            return {...state, all: [...state.all, action.payload]};
        case RETR_RECORDS:
            console.log('retrieve reduce',action.payload);
            return{...state, all: action.payload};
        case UPD_RECORD:
            return {...state}
        default:
            return state;
    }
}