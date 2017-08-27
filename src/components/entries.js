import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import renderInput from './utilities/renderInput';
import { updateEntry, deleteEntry } from '../actions/index';
import Btn from './utilities/buttons';

class Entries extends Component{
    constructor(props){
        super(props);
        this.state={
            enableEdit: false,
        }
    }

    handleEdit(){
        console.log('edit mode',this);

        const {name, course_name, grade} = this.props.entries[this.props.position];
        this.props.initialValues.name = name;
        this.props.initialValues.course =course_name;
        this.props.initialValues.grade = grade;
        this.setState({
            enableEdit: !this.state.enableEdit,

        });
    }
    handleDelete(){
        const deleteID = {"id": this.props.record.id};
        console.log('am doin a deletin',this.props.record);
        this.props.deleteEntry(deleteID);

    }
    handleSubmitEntry(values){
        let edited = {...values, "id":this.props.record.id};

        console.log('submitted vals',edited);
        this.props.updateEntry(edited);
        this.setState({
            enableEdit: !this.state.enableEdit,
        })
    }
    handleCancelClick(){
        this.setState({enableEdit: !this.state.enableEdit});
    }

    render(){
        console.log('entries component',this.props);
        const {handleSubmit, error} = this.props;

        if(!this.state.enableEdit){
            return (
                <div className="tr tEntry">
                    <span className="td nameField">{this.props.record.name}</span>
                    <span className="td courseField">{this.props.record.course_name}</span>
                    <span className="td gradeField">{this.props.record.grade}</span>
                    <span className="td btnField">
                        <div className="btnBox">
                        <button type="button" className="btn edit btn-link" onClick={this.handleEdit.bind(this)}>Edit</button>
                        <button type="button" className="btn del btn-outline-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
                        </div>
                    </span>
                </div>
            )
        }else{
            return (
                <form className="tr tEditForm" onSubmit={handleSubmit((values) => {this.handleSubmitEntry(values)})}>
                    <span className="td tForm">
                        <Field className="form-control"  name="name" val={this.props.record.name} component={renderInput} />
                    </span>
                    <span className="td tForm">
                        <Field className="form-control"  name="course" val={this.props.record.course_name} component={renderInput} />
                    </span>
                    <span className="td tForm">
                        <Field className="form-control" name="grade" val={this.props.record.grade} type="number" component={renderInput} />
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

        // if(!this.state.enableEdit){
        //     return (
        //         <tr className="entryContainer" key={this.props.record.id}>
        //             <td className="nameField">{this.props.record.name}</td>
        //             <td className="courseField">{this.props.record.course_name}</td>
        //             <td className="gradeField">{this.props.record.grade}</td>
        //             <td className="optsField">
        //                 <button type="button" className="btn btn-primary" onClick={this.handleEdit.bind(this)}>Edit</button>
        //                 <button type="button" className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
        //                 {/*<Btn type={"button"} bsStyle={"danger"} cName={"btn"} onClick={this.handleDelete.bind(this)} label={"Delete"}/>*/}
        //             </td>
        //         </tr>
        //     )
        // } else {
        //     return (
        //         <tr>
        //         <form key={this.props.record.id} onSubmit={handleSubmit((values) => {this.handleSubmitEntry(values)})}>
        //             <td><Field name="name" val={ this.props.record.name} component={renderInput}/></td>
        //             <td><Field name="course" val={this.props.record.course_name} component={renderInput}/></td>
        //             <td><Field name="grade" val={this.props.record.grade} type="number" component={renderInput}/></td>
        //             <td>
        //                 <button type="submit" className="btn btn-primary" label="Add">Submit</button>
        //                 <button onClick={this.handleCancelClick.bind(this)} type="button" className="btn btn-danger"
        //                         label="Clear">Cancel
        //                 </button>
        //             </td>
        //         </form>
        //         </tr>
        //     )
        // }
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
    enableReinitialize: true,
    validate
})(Entries);

function mapStateToProps(state, ownProps){
    return{
        entries: state.entries.all,
        form: `edit${ownProps.position}`,
    }
}

export default connect(mapStateToProps,{ updateEntry, deleteEntry })(Entries);
// export default Entries;