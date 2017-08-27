import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const Confirm = (props) => {
    return(
        <div>
            <Modal className="modBox" show = {props.show} onHide={props.onCancel()} >
                <Modal.Header closeButton>
                    <Modal.Title>{props.action}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{props.warn}</h4>
                    <p className="modalText">name: {props.entry.name}</p>
                    <p className="modalText">course: {props.entry.course_name}</p>
                    <p className="modalText">grade: {props.entry.grade}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-outline-dark" onClick={props.onClick()}>Confirm</Button>
                    <Button bsStyle="danger" className="btn-outline-danger" onClick={props.onCancel()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default Confirm;