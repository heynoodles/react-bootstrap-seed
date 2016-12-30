import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import AppRouter from './router';
import {Provider} from 'react-redux';
import Request from '../utils/Request';
import {createStore, applyMiddleware ,compose} from 'redux';
import Spin from '../component/common/Spin';

import reducers from '../reducers/index';
import ModalRouter from '../component/ModalRouter';


let store = createStore(reducers, undefined, compose(
    applyMiddleware(
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

if (module.hot) {
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers/index');
        store.replaceReducer(nextRootReducer);
    });
}

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Provider store={store}>
                    <AppRouter wrapComp={::this.wrapComp}/>
                </Provider>
            </div>
        );
    }

    wrapComp(Comp) {
        return class extends Component {
            constructor(props) {
                super(props);

                this.state = {
                    showSpin: false,
                    spinTitle: ''
                };
            }

            render() {
                return (
                    <div>
                        <ModalRouter ref="modalRouter"/>
                        <NotificationSystem ref="notificationSystem"/>
                        <Spin show={this.state.showSpin} title={this.state.spinTitle}/>
                        <Comp {...this.props}
                            request={::this.request}
                            showModal={::this.showModal}
                            notify={::this.notify}
                            showSpin={::this.showSpin}
                            hideSpin={::this.hideSpin}/>
                    </div>
                );
            }

            /**
             * 发送ajax请求
             * @param url   请求地址(必填)
             * @param method    请求方法(默认GET)
             * @param data  请求参数(需求就填)
             * @param contentType  请求类型, 默认'json'
             * @param onSuc 业务成功(code:200)
             * @param onFail    业务失败(code:500)
             * @param onErr http错误
             * @param onResponded   收到回应统一执行的动作
             *
             * 调用的时候实际只需要传url, data, onSuc
             */
            request({url, method, data, contentType, onSuc, onFail, onErr, onOther, onResponded}) {
                let self = this;
                onFail = onFail || (resp => self.notify(resp.message, 'error'));
                onErr = onErr || (() => self.notify("网络错误", 'error'));
                Request({
                    url, method, data, contentType,
                    onSuc: resp => {
                        onSuc && onSuc(resp);
                        onResponded && onResponded(resp);
                        self.hideSpin();
                    },
                    onFail: resp => {
                        onFail && onFail(resp);
                        onResponded && onResponded(resp);
                        self.hideSpin();
                    },
                    onErr: err => {
                        onErr && onErr(err);
                        onResponded && onResponded(err);
                        self.hideSpin();
                    },
                    onOther: resp => {
                        onOther && onOther(resp);
                        onResponded && onResponded(resp);
                        self.hideSpin();
                    }
                });
            }

            /**
             * 右上角消息弹框
             * @param msg   消息
             * @param lvl   级别:'success','info','warn','error'
             * @param autoDismiss   消失时间, 不传默认为5秒
             */
            notify(msg, lvl, autoDismiss) {
                this.refs.notificationSystem.addNotification({
                    message: msg,
                    level: lvl,
                    autoDismiss: autoDismiss || 5
                });
            }

            showSpin(title) {
                this.setState({
                    showSpin: true,
                    spinTitle: title
                })
            }

            hideSpin() {
                this.setState({
                    showSpin: false,
                    spinTitle: ''
                })
            }

            showModal(type, data) {
                this.modalRouter.show(type, data);
            }

            componentDidMount() {
                this.modalRouter = this.refs.modalRouter;
            }
        }
    }

};