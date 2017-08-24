import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Grid, Row, Col } from 'react-bootstrap';
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
        const entries = this.props.entries.map((record, index) => {
            return <Entries key={index} formKey={index.toString()} initialValues={record} record={record} position={index} />
        });
        return(
            <Col sm={9} className="entryList">
                {this.props.entries.length === 0 ? (
                        <div className="spinnerContainer">
                            <div className="holder">
                                <div className="loader">
                                    Loading...
                                </div>
                            </div>
                        </div>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*this.props.entries.map((record, index) => {*/}
                                    {/*return <Entries key={index} formKey={index.toString()} initialValues={record} record={record} position={index} />*/}
                                {/*})*/}
                                {entries}
                            </tbody>
                        </table>
                    )
                }
            </Col>
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