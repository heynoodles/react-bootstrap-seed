import React, { Component, PropTypes } from 'react';

export default class AbstractModal extends Component {

    constructor(props) {
        super(props);
    }

    close() {
        this.props.hide();
        const {onClose} = this.props;
        onClose && onClose();
    }

    confirm(data) {
        this.props.hide();
        const {onConfirm} = this.props;
        onConfirm && onConfirm(data);
    }
};