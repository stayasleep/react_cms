import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Entries from './entries';
import { retrieveAll } from '../actions/index';


class EntryBody extends Component{
    componentWillMount(){
        console.log('will axios go here',this.props);
        this.props.retrieveAll();
    };

    componentWillReceiveProps(nextProps){
        console.log('next prop yo', nextProps);
        console.log('this next prop',this.props);
        console.log('it exist',this.props.allState.add);
        if(nextProps.allState.add){
            this.props.retrieveAll();
        }else if(nextProps.allState.del){
            this.props.retrieveAll();
        }else if(nextProps.allState.upd){
            this.props.retrieveAll();
        }
    }

    render(){
        console.log('render prop',this.props);
        // const entries = this.props.entries.map((record, index) => {
        //     return <Entries key={index} formKey={index.toString()} initialValues={record} record={record} position={index} />
        // });
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Grade</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.entries.length === 0 ? (
                                <tr>
                                    <td>There are no records in the database, please add some new entries!</td>
                                </tr>
                            ) : (
                                this.props.entries.map((record, index) => {
                                    return <Entries key={index} formKey={index.toString()} initialValues={record} record={record} position={index} />
                                })
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        entries: state.entries.all,
        allState: state.entries,
    }
}

export default connect(mapStateToProps,{ retrieveAll })(EntryBody);