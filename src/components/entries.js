import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


class Entries extends Component{
    componentWillMount(){
        console.log('props',this.props);
    }
    render(){
        return(
            <div>

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