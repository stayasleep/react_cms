import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Grid, Row, Col } from 'react-bootstrap';
import renderInput from './utilities/renderInput';
import { addStudent, addRecord } from '../actions/index';


class Add extends Component{

    handleAddEntry(values){
        console.log('am values from add', values);
        this.props.addRecord(values);
        this.props.reset("add");
    }

    render(){
        const {error, handleSubmit, reset} = this.props;

        return(
            <Col sm={3} className="pull-right addForm well">
                <h4>Add Entry</h4>
                <form onSubmit={handleSubmit((values) => {this.handleAddEntry(values)})}>
                    <div>
                        <Field className="form-control add-name" name="name" label="First and Last Name" component={renderInput} />
                        <Field className="form-control course-name" name="course" label="Course Name" component={renderInput} />
                        <Field className="form-control grade-name" name="grade" label="Course Grade" type="number" component={renderInput} />
                    </div>
                    <div>
                        <button type="submit" className="btn add-group btn-outline-dark" label="Add" >Add</button>
                        <button onClick={reset} type="button" className="btn add-group btn-outline-info" label="Clear">Clear</button>
                    </div>
                </form>

            </Col>
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

export default connect(null,{addRecord})(Add);