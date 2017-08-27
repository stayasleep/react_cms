import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Col } from 'react-bootstrap';
import renderInput from './utilities/renderInput';
import { addRecord } from '../actions/index';


class Add extends Component{

    handleAddEntry(values){
        this.props.addRecord(values);
        this.props.reset("add");
    }

    render(){
        const { handleSubmit, pristine, submitting, reset } = this.props;
        return(
            <Col xs={12} sm={3} className="pull-right addForm well">
                <h4>Add Entry</h4>
                <form onSubmit={handleSubmit((values) => {this.handleAddEntry(values)})}>
                    <div>
                        <Field className="form-control add-name" name="name" label="First and Last Name" component={renderInput} />
                        <Field className="form-control course-name" name="course" label="Course Name" component={renderInput} />
                        <Field className="form-control grade-name" name="grade" label="Course Grade" type="number" component={renderInput} />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-lg add-group btn-outline-dark" label="Add" disabled={submitting} >Add</button>
                        <button onClick={reset} type="button" className="btn btn-lg add-group btn-outline-info" label="Clear" disabled={pristine || submitting} >Clear</button>
                    </div>
                </form>

            </Col>
        )
    }
}

function validate(values){
    const errors = {};
    if(!values.name){
        errors.name = "Required";
    }else if(values.name.length <= 2){
        errors.name = "Name must be at least 3 characters";
    }else if(values.name.length > 20 ){
        errors.name = "Name must be 20 characters or less";
    }

    if(!values.course){
        errors.course = "Required";
    } else if(!/^([a-zA-Z0-9 :\-.'"]+){2,40}$/g.test(values.course)){
        if(values.course.length <= 2){
            errors.course = "Course must contain at least 3 characters.";
        }else{
            errors.course = "Course must be 40 characters or fewer.";
        }
    }

    if(!values.grade) {
        errors.grade = "Required";
    } else if(values.grade < 1 ){
        errors.grade = "Grade must be greater than zero (0).";
    } else if(!/^0*(?:[1-9][0-9]?|100)$/g.test(values.grade)){
        errors.grade = "Please enter a whole number only";
    }

    return errors;
}

Add = reduxForm({
    form: 'add',
    validate
})(Add);

export default connect(null,{addRecord})(Add);