import React, { Component, PropTypes } from 'react';
import {Modal,Button} from 'react-bootstrap';
import AbstractModal from './AbstractModal';

export default class Confirm extends AbstractModal {

    constructor(props) {
        super(props);
    }

    render() {
        const {title, body} = this.props;
        return (
            <Modal show={this.props.show} closeButton onHide={::this.close}>
                <Modal.Header>
                    <Modal.Title>
                        <div>{title || '提示'}</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{body}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={::this.confirm} bsStyle='primary'>确认</Button>
                    <Button onClick={::this.close} bsStyle='default'>取消</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}