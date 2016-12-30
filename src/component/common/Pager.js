import React, {Component, PropTypes} from 'react';

import {Row,Col,Input,Button,Panel,Grid,Pagination} from 'react-bootstrap';

export default class Pager extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        onSelectPageIndex: PropTypes.func.isRequired,
        onSelectPageSize: PropTypes.func.isRequired,
        pageIndex: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired
    };

    getTotalPage() {
        return (Math.ceil(this.props.total / this.props.pageSize));
    }

    handleSelectPageIndex(key) {
        let totalPage = this.getTotalPage();
        if (key <= 0 || key > totalPage) {
            return false;
        }
        this.props.onSelectPageIndex(key);
    }

    handleSelectPageSize(e) {
        this.props.onSelectPageSize(e.target.value);
    }

    render() {
        let totalPage = this.getTotalPage();

        return (
            <div style={{textAlign:'right', marginBottom:'40px'}}>
                <span>{`共${this.props.total}条记录`}</span>
                <Pagination
                    style={{display:'inline-block',height:'3px',paddingLeft:'10px'}}
                    prev
                    next
                    first
                    last
                    ellipsis
                    items={this.getTotalPage()}
                    maxButtons={10>totalPage ? totalPage:10}
                    activePage={this.props.pageIndex}
                    onSelect={::this.handleSelectPageIndex}/>

                <span>每页</span>

                <div style={{display:'inline-block',width:'60px',marginLeft:'2px',marginRight:'2px'}}>
                    <Input type='select' value={this.props.pageSize} onChange={::this.handleSelectPageSize}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </Input>
                </div>
                <span>条</span>
            </div>
        );
    }

}