import {
    ADD_STUDENT
} from './type';

export function addStudent(entry){
    console.log('add', entry);
    return{
        type: ADD_STUDENT,
        payload: entry,
    }
}