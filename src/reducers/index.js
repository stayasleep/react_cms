import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import studentReducer from './student_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    entries: studentReducer,
});

export default rootReducer;