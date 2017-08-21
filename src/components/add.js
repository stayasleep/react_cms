import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import renderInput from './utilities/renderInput';
import { addStudent } from '../actions/index';


class Add extends Component{

    handleAddEntry(values){
        this.props.addStudent(values);
        this.props.reset("add");
        //action creator here to send entry objecgt to the server via axios call
    }

    render(){
        const {error, handleSubmit, reset} = this.props;

        return(
            <div>
                <form onSubmit={handleSubmit((values) => {this.handleAddEntry(values)})}>
                    <div>
                        <Field name="name" label="First and Last Name" component={renderInput} />
                        <Field name="course" label="Course Name" component={renderInput} />
                        <Field name="grade" label="Course Grade" type="number" component={renderInput} />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary" label="Add" >Add</button>
                        <button onClick={reset} type="button" className="btn btn-danger" label="Clear">Clear</button>
                    </div>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    const requiredFields = ['name', 'course', 'grade'];
    requiredFields.forEach((field) => {
        if (!values[field]){
            errors[field] = "Required";
        }
    });
    return errors;
}

Add = reduxForm({
    form: 'add',
    validate
})(Add);

export default connect(null,{addStudent})(Add);