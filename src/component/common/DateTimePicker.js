import React, { Component ,PropTypes} from 'react';
import Datetime from 'react-datetime';
import {FormControl,OverlayTrigger,Popover} from 'react-bootstrap';
import moment from 'moment';

export default class DateTimePicker extends Component {

    constructor(props,context){
        super(props,context);
    }


    changeHandler(val){
        var {onChange}=this.props;
        onChange&&onChange(val);
    }

    isValidDate(current){
        debugger
        let res = true;
        if(this.props.minDate){
            res = current.isSameOrAfter(this.props.minDate)
        }
        if(this.props.maxDate){
            res = res && current.isSameOrBefore( this.props.maxDate)
        }
        return res;
    }

    render(){
        let datetime=this.props.value;
        var {dateFormat,value,...others}=this.props;
        if(!dateFormat){
            dateFormat='YYYY-MM-DD';
        }
        return (
        <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
            <Popover>
                <Datetime
                    input={false}
                    open={true}
                    dateFormat={dateFormat}
                    value={datetime}
                    isValidDate={function(current) {
                        console.log(current);
                      return current.day()!==0&&current.day()!==6;
                    }}
                    onChange={::this.changeHandler}
                    locale='zh-cn'
                 />
            </Popover>}>
            <FormControl readOnly {...others}  value={datetime ? datetime.format(dateFormat) : ""}  type='text' style={{width:"140px",display:'inline'}} />

        </OverlayTrigger>
        );
    }
}