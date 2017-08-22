import React from 'react';
import { Button } from 'react-bootstrap';

const Btn = (props) => {
    return(
        <Button
            bsStyle={props.bsStyle}
            bsClass={props.cName}
            type={props.type}
            onClick={()=>props.onClick()}
        >
            {props.label}
        </Button>
    )
};

export default Btn;