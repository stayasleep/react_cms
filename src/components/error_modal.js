import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ErrorModal = (props) => {
    return (
        <div>
            <Modal className="modBox" show={props.show} onHide={props.onCancel()}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.action}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{props.warn}</h4>
                    <p className="modalText">Message: {props.errs}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="danger" className="btn-outline-danger" onClick={props.onCancel()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default ErrorModal;