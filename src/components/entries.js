import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import renderInput from './utilities/renderInput';
import { addStudent } from '../actions/index';
import Btn from './utilities/buttons';

class Entries extends Component{
    constructor(props){
        super(props);
        this.state={
            enableEdit: false,
        }
    }

    handleEdit(){
        console.log('edit mode',this.state.enableEdit);
        const {name, course, grade} = this.props.record;
        this.props.editValue.name = name;
        this.props.editValue.course =course;
        this.props.editValue.grade = grade;
        this.setState({enableEdit: !this.state.enableEdit});
    }
    handleDelete(){
        console.log('am doin a deletin');
    }
    handleSubmitEntry(values){
        console.log('submitted vals',values);
        this.props.addStudent(values);
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
                            <Btn type={"button"} bsStyle={"danger"} cName={"btn"} onClick={this.handleDelete.bind(this)} label={"Delete"}/>
                        </div>

                    </div>
                ) : (
                    <div>
                        <form onSubmit={handleSubmit((values) => {this.handleSubmitEntry(values)})}>
                            <div>
                                <Field name="name" label={this.props.record.name} component={renderInput} />
                                <Field name="course" label={this.props.record.course} component={renderInput} />
                                <Field name="grade" label={this.props.record.grade} type="number" component={renderInput} />
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
    editValue: {"name":"", "course":"", "grade":""},
    validate
})(Entries);

function mapStateToProps(state){
    return{
        entries: state.entries.all,
    }
}
export default connect(mapStateToProps,{ addStudent })(Entries);
// export default Entries;