import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import addedStudent from './student';

const rootReducer = combineReducers({
    form: formReducer,
    entries: addedStudent
});

export default rootReducer;