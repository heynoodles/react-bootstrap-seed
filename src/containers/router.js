import React, { Component ,PropTypes} from 'react';
import { Redirect, Router, Route } from 'react-router';
import History from 'history/lib/createHashHistory';
import Components from './components';


export default class AppRouter extends Component {

    constructor(props) {
        super(props);

        this.history = new History({
            queryKey: false
        });
    }

    static defaultProps = {};

    /**
     * 页面路由总览，children为外接做入口，外接入口即为AppRouter
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Router history={this.history}>
                    <Redirect from="/" to="/components"/>
                    <Route path="/components" component={this.props.wrapComp(Components)} />
                </Router>
            </div>
        );
    }

}