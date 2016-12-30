import React, { Component ,PropTypes} from 'react';
import {connect} from 'react-redux';
import * as ComponentsAction from '../actions/components';
import ModalTypes from '../constants/ModalTypes';
import moment from 'moment';
import DateTimePicker from '../component/common/DateTimePicker';
import {Button} from 'react-bootstrap'

@connect(state => ({
    reducer: state.componentsReducer
}), ComponentsAction)
export default class Components extends Component {

    constructor(props) {
        super(props);

        this.request = this.props.request;

        let self = this;
        this.props.request({
            "url": "test",
            "data": {},
            "onSuc": function (resp) {
                self.props.setLoad(resp.data);
            }
        })
    }

    transDateTime(time) {
        if (typeof time === 'string' && time.length > 0) {
            return moment(time);
        }
    }

    changeDate(val) {
        let value = val.format('YYYY-MM')
        this.props.setData(['date'], value);
    }

    render() {
        let self = this;
        return (
            <div>
                Components
                <div>
                <Button onClick={() => this.props.notify("msg", "success")}>notify</Button>
                <Button onClick={() => {
                    this.props.showSpin("+5s");
                    setTimeout(function() {
                        self.props.hideSpin();
                    }, 5000)
                    }}>showSpin</Button>
                <Button onClick={() => this.props.showModal(ModalTypes.ALERT, {"title": "title", "body": "body"})}>alert</Button>
                <Button onClick={() => this.props.showModal(ModalTypes.CONFIRM, {"title": "title", "body": "body"})}>confirm</Button>
                    </div>
                <h1>{this.props.reducer.get('name')}</h1>
                date picker:
                <DateTimePicker
                    input={false}
                    dateFormat='YYYY-MM'
                    minDate={this.transDateTime("2016-01")}
                    maxDate={this.transDateTime("2017-01")}
                    onChange={::this.changeDate}
                    value={this.transDateTime(this.props.reducer.get('date'))}
                    locale='zh-cn'
                />
            </div>
        )
    }
};