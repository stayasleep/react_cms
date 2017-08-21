import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


class Entries extends Component{
    componentDidMount(){
        console.log('props',this.props);
    }

    // componentWillReceiveProps(nextProps){
    //     console.log('next prop yo', nextProps);
    // }

    render(){
        console.log('render prop',this.props);
        return(
            <div>
                <div>{this.props.entries.name}</div>
                <div>{this.props.entries.course}</div>
                <div>{this.props.entries.grade}</div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        entries: state.entries,
    }
}

export default connect(mapStateToProps,{})(Entries);