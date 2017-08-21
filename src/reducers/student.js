import {
    ADD_RECORD
} from '../actions/type';

const defaultState = {name: "", course: "", grade: 0};

export default function(state = defaultState, action) {
    switch (action.type){
        case ADD_RECORD:
            return {...state, name: action.payload.name, course: action.payload.course, grade: action.payload.grade}
    }
    return state;
}