import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import renderInput from './utilities/renderInput';

class Entries extends Component{
    constructor(props){
        super(props);
        this.state={
            enableEdit: false,
        }
    }

    handleEdit(){
        console.log('edit mode',this.state.enableEdit);
        this.setState({enableEdit: !this.state.enableEdit});
    }
    handleDelete(){

    }
    handleSubmitEntry(values){
        console.log('submitted vals',values);
    }
    handleCancelClick(){
        console.log('state before change',this.state.enableEdit);
        this.setState({enableEdit: !this.state.enableEdit});
        console.log('stae after',this.state.enableEdit);
    }

    render(){
        console.log('entries component',this.props);
        const {handleSubmit, error} = this.props;

        return(
            <div>
                {!this.state.enableEdit ? (
                    <div>
                        <div className="nameField">{this.props.record.name}</div>
                        <div className="courseField">{this.props.record.course}</div>
                        <div className="gradeField">{this.props.record.grade}</div>
                        <div className="optsField">
                            <button type="button" onClick={this.handleEdit.bind(this)}>Edit</button>
                            <button type="button" onClick={this.handleDelete.bind(this)}>Delete</button>
                        </div>

                    </div>
                ) : (
                    <div>
                        <form onSubmit={handleSubmit((values) => {this.handleSubmitEntry(values)})}>
                            <div>
                                <Field name="name" label="First and Last Name" component={renderInput} />
                                <Field name="course" label="Course Name" component={renderInput} />
                                <Field name="grade" label="Course Grade" type="number" component={renderInput} />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary" label="Add" >Submit</button>
                                <button onClick={this.handleCancelClick.bind(this)} type="button" className="btn btn-danger" label="Clear">Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
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

Entries = reduxForm({
    form: 'edit',
    validate
})(Entries);

export default Entries;