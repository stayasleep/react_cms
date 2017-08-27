import React from 'react';
import { Col } from 'react-bootstrap';


export default (props) => {
    return(
        <Col>
            <div className="hidden-xs">
                <h1>
                    Grade Management System
                    <small className="avgText pull-right">Average: <span className="label label-default">3</span></small>
                </h1>
            </div>
            <div className="hidden-sm hidden-md hidden-lg">
                <h3>
                    Grade Management System
                    <small className="avgText">Average: <span className="label label-default"></span></small>
                </h3>
            </div>
            <hr/>
        </Col>
    );
};
