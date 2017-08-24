import React from 'react';
import { Col } from 'react-bootstrap';


export default (props) => {
    return(
        <Col>
            <div className="hidden-xs">
                <h1>
                    CryptoCurrency Management Logger
                    <small className="avgText">Average: </small>
                </h1>
            </div>
            <div className="hidden-sm hidden-md hidden-lg">
                <h3>
                    CryptoCurrency Management Logger
                    <small className="avgText">Average: </small>
                </h3>
            </div>
        </Col>
    );
};
