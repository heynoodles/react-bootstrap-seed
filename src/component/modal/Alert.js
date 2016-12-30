import React, { Component, PropTypes } from 'react';
import {Modal,Button} from 'react-bootstrap';
import AbstractModal from './AbstractModal';

export default class Alert extends AbstractModal {

    constructor(props) {
        super(props);
    }

    render() {
        const {title, body, bsSize} = this.props;
        return (
            <Modal show={this.props.show} closeButton onHide={::this.close} bsSize={bsSize||"md"}>
                <Modal.Header>
                    <Modal.Title>
                        <div>{title || '提示'}</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{body}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={::this.confirm} bsStyle='primary'>确定</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}