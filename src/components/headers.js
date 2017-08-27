import React, {Component} from 'react';
import { Col } from 'react-bootstrap';
import {connect} from 'react-redux';



class Headers extends Component{

    doMath(){
        if(this.props.entries.length === 0){
            return 0;
        }
        let number = this.props.entries.reduce((sum, num) => {
            return sum + parseFloat(num["grade"]);
        },0);
        number = (number / this.props.entries.length).toFixed(2);
        return number;
    }

    render(){

        return(
            <Col>
                <div className="hidden-xs">
                    <h1>
                        Grade Management System
                        <small className="avgText pull-right">Average: <span className="label label-default">{this.doMath()}%</span></small>
                    </h1>
                </div>
                <div className="hidden-sm hidden-md hidden-lg">
                    <h3>
                        Grade Management System
                        <small className="avgText pull-right">Average: <span className="label label-default">{this.doMath()}%</span></small>
                    </h3>
                </div>
                <hr/>
            </Col>
        )
    }
}

function mapStateToProps(state){
    return{
        entries: state.entries.all,
    }
}

export default connect(mapStateToProps,{})(Headers)