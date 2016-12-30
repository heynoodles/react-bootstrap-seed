/**
 * Created by jianheng.he on 16/7/26.
 */
import React, { Component ,PropTypes } from 'react';
import {ButtonToolbar,DropdownButton,MenuItem} from 'react-bootstrap';


export default class Select extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        items: PropTypes.array.isRequired,
        value: PropTypes.object.isRequired
    };

    render() {
        let {items, getItemDisplay, value, onChange, readonly} = this.props;
        return (
            <div style={{display:'inline-block'}}>
                {readonly ? getItemDisplay(value) :
                    <DropdownButton bsSize="small"
                                    title={this.getTitle()}
                                    onSelect={v => onChange&&onChange(v)}
                                    style={this.props.style} className={this.props.className+" dropdown-select"}>
                        {items && items.map(e => <MenuItem eventKey={e}>{getItemDisplay(e)}</MenuItem>)}
                    </DropdownButton>}
            </div>
        );
    }

    getTitle() {
        let {items, value, getItemDisplay, placeholder} = this.props;
        let title;
        if (value && items && items.map(i => getItemDisplay(i)).indexOf(getItemDisplay(value)) >= 0) {
            title = getItemDisplay(value);
        }
        return title || placeholder;
    }

};