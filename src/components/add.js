import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


class Add extends Component{

}

Add = reduxForm({
    form: 'add',
    validate
})(Add);

export default Add;