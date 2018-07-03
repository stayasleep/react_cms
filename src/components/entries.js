import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import renderInput from './utilities/renderInput';
import { updateEntry, deleteEntry } from '../actions/index';
import Confirm from './confirmation';


class Entries extends Component{
    constructor(props){
        super(props);
        this.state={
            enableEdit: false,
            enableDelete: false,
        }
    }

    renderDelete(){
        return (!this.state.enableDelete ?
            (
                null
            ) : (
                <Confirm
                    action="Confirm Delete?"
                    warn="Action cannot be undone if confirmed"
                    show={this.state.enableDelete}
                    entry = {this.props.record}
                    onClick={() => this.handleDelete.bind(this)}
                    onCancel={() => this.handleCancelDelete.bind(this)}
                />
            )
        )
    }
    handleDeleteOption(){
        this.setState({enableDelete: !this.state.enableDelete});
    }
    handleCancelDelete(){
        this.setState({enableDelete: !this.state.enableDelete});
    }
    handleDelete(){
        const deleteID = {"id": this.props.record.id};
        this.props.deleteEntry(deleteID);
        this.setState({enableDelete: !this.state.enableDelete});
    }

    handleEdit(){
        console.log('edit mode',this);
        this.setState({
            enableEdit: !this.state.enableEdit,
        });
    }

    handleSubmitEntry(values){
        let edited = {...values, "id":this.props.record.id};
        this.props.updateEntry(edited);
        this.setState({
            enableEdit: !this.state.enableEdit,
        })
    }
    handleCancelClick(){
        this.setState({
            enableEdit: !this.state.enableEdit,
        });
        this.props.reset("edit");
    }

    render(){
        const {handleSubmit } = this.props;


        if(!this.state.enableEdit){
            return (
                <div className="tr tEntry">
                    <span className="td nameField">{this.props.record.name}</span>
                    <span className="td courseField">{this.props.record.course_name}</span>
                    <span className="td gradeField">{this.props.record.grade}</span>
                    <span className="td btnField">
                        <div className="btnBox">
                            <button type="button" className="btn edit btn-link" onClick={this.handleEdit.bind(this)}>Edit</button>
                            <button type="button" className="btn del btn-outline-danger" onClick={this.handleDeleteOption.bind(this)}>Delete</button>
                        </div>
                    </span>
                    {this.renderDelete()}
                </div>
            )
        }else{
            return (
                <form className="tr tEditForm" onSubmit={handleSubmit((values) => {this.handleSubmitEntry(values)})}>
                    <span className="td tForm">
                        <Field className="form-control" name="name"  component={renderInput} />
                    </span>
                    <span className="td tForm">
                        <Field className="form-control" name="course_name" component={renderInput} />
                    </span>
                    <span className="td tForm">
                        <Field className="form-control" name="grade" type="number" component={renderInput} />
                    </span>
                    <span className="td tForm btnBox">
                        <button type="submit" className="btn edit btn-outline-dark" label="Submit">Submit</button>
                        <button onClick={this.handleCancelClick.bind(this)} type="button" className="btn del btn-outline-danger" label="Cancel">
                            Cancel
                        </button>
                    </span>
                </form>
            )
        }
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

    if(!values.course_name){
        errors.course_name = "Required";
    } else if(!/^([a-zA-Z0-9 :\-.'"]+){2,40}$/g.test(values.course_name)){
        if(values.course_name.length <= 2){
            errors.course_name = "Course must contain at least 3 characters.";
        }else if(values.course_name.length >40){
            errors.course_name = "Course must be 40 characters or fewer.";
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


Entries = reduxForm({
    form: 'edit',
    enableReinitialize: true,
    overwriteOnInitialValuesChange: false,
    validate
})(Entries);

function mapStateToProps(state, ownProps){
    return{
        entries: state.entries.all,
        form: `edit${ownProps.position}`,
    }
}

export default connect(mapStateToProps,{ updateEntry, deleteEntry })(Entries);
