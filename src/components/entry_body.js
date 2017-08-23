import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Entries from './entries';
import { retrieveAll } from '../actions/index'


class EntryBody extends Component{
    componentWillMount(){
        console.log('will axios go here',this.props);
        this.props.retrieveAll();
    };
    componentDidMount(){
        console.log('did axios go here',this.props);
    }

    // componentWillReceiveProps(nextProps){
    //     console.log('next prop yo', nextProps);
    // }

    render(){
        console.log('render prop',this.props.entries);
        const entries = this.props.entries.map((record, index) => {
            return <Entries key={index} record={record} />
        });
        return(
            <div>
                {this.props.entries.length === 0 ? (
                        <div>
                            There are no records in the database, please add some new entries!
                        </div>
                    ) : (
                        <div>
                            { entries }
                        </div>
                    )
                }
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        entries: state.entries.all,
    }
}

export default connect(mapStateToProps,{ retrieveAll })(EntryBody);