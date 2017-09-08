import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Col } from 'react-bootstrap';
import Entries from './entries';
import { retrieveAll, resetErrors } from '../actions/index';
import ErrorModal from './error_modal';

class EntryBody extends Component{
    constructor(props){
        super(props);
        this.state = {show: false, name: null};
    }

    componentWillMount(){
        this.props.retrieveAll();
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.allState.add){
            this.props.retrieveAll();
            this.setState({show: true, name:nextProps.allState.name});
        }else if(nextProps.allState.del){
            this.props.retrieveAll();
        }else if(nextProps.allState.upd){
            this.props.retrieveAll();
        }
    }

    handleCancel(){
        this.props.resetErrors();
    }
    handleDismiss(){
        this.setState({show: false, name: null});
    }
    handleAlertAutoClose() {
        setTimeout(() => {
                this.setState({show: false, name: null});
        }
        , 4000);
    }

    render(){
        return(
            <Col xs={12} sm={9} className="pull-left entryList">
                <div className="table">
                    <div className="thead">
                        <div className="tr">
                            <span className="td">Name</span>
                            <span className="td">Course</span>
                            <span className="td">Grade</span>
                            <span className="td">Operations</span>
                        </div>
                    </div>

                    <div className="tbody">
                        {this.props.allState.loading ?
                            (
                                <div className="spinnerContainer">
                                    <div className="holder">
                                        <div className="loader">
                                            Loading...
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                this.props.entries.length === 0 ?
                                    (
                                        <div style={{paddingTop: "16px"}}>
                                            No entries in the database.  Please add some entries!
                                        </div>
                                    ) : (
                                        this.props.entries.map((record, index) => {
                                            return <Entries key={index} formKey={index.toString()} initialValues={record} record={record} position={index} />
                                        })
                                    )
                            )
                        }
                    </div>
                    {this.props.allState.error ?
                        <ErrorModal
                            action="Error"
                            warn="Network cannot process your request at this time."
                            errs="Please notify database admin"
                            show={this.props.allState.error}
                            onCancel={() => this.handleCancel.bind(this)}
                        /> :
                        null
                    }
                </div>
                {this.state.show ?
                    (
                        <Alert bsStyle="success" onDismiss={this.handleDismiss.bind(this)}>
                            <h4>Success!</h4>
                            <p>Added {this.state.name} to the database.</p>
                            <button type="button" className="btn del btn-outline-danger" onClick={this.handleDismiss.bind(this)}>Close</button>
                        </Alert>
                    ) :
                    (null)
                }
                {this.state.show ? this.handleAlertAutoClose.bind(this)() : null}
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

export default connect(mapStateToProps,{ retrieveAll, resetErrors })(EntryBody);