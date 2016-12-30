import React, { Component } from 'react';
import { connect } from 'react-redux';


export default class LoadingBar extends Component {

    constructor(props, context) {
        super(props, context);
        this.init = false;
        this.moduleName = 'ref-loadingBar';
        this.style = {

            loadingbar: {
                position: 'fixed',
                zIndex: 2147483647,
                opacity: 1,
                top: '0px',
                display: 'block',
                left: '-6px',
                width: '1%',
                height: '2px',
                background: '#b91f1f',
                MozBorderRadius: '1px',
                WebkitBorderRadius: '1px',
                borderRadius: '1px',
                MozTransition: 'all 500ms ease-in-out',
                msTransition: 'all 500ms ease-in-out',
                WebkitTransition: 'all 500ms ease-in-out',
                transition: 'all 500ms ease-in-out'
            },
            waiting: {
                MozAnimation: 'pulse 2s ease-out 0s infinite',
                msAnimation: 'pulse 2s ease-out 0s infinite',
                oAnimation: 'pulse 2s ease-out 0s infinite',
                WebkitAnimation: 'pulse 2s ease-out 0s infinite',
                animation: 'pulse 2s ease-out 0s infinite'
            },
            i: {
                opacity: 0.6,
                width: '180px',
                right: '-80px',
                display: 'block',
                clip: 'rect(-6px,90px,14px,-6px)'
            },
            b: {
                opacity: 0.6,
                width: '20px',
                right: '0px',
                clip: 'rect(-6px,22px,14px,10px)'
            },
            bi: {
                position: 'absolute',
                top: '0px',
                height: '2px',
                MozBoxShadow: '#b91f1f 1px 0 6px 1px',
                msBoxShadow: '#b91f1f 1px 0 6px 1px',
                WebkitBoxShadow: '#B91F1F 1px 0 6px 1px',
                boxShadow: '#B91F1F 1px 0 6px 1px',
                MozBorderRadius: '100%',
                WebkitBorderRadius: '100%',
                borderRadius: '100%'
            }

        };

        this.state = {
            loading: props.loading,
            style: {}
        };
    }

    setProcess() {
        let {loading} = this.props;

        if (this.init) {

            if (loading) {
                this.setState({
                    style: {
                        width: (50 + Math.random() * 30) + "%",
                        opacity: 1
                    },
                    loading: 1
                });
                //elm.style.width=(50 + Math.random() * 30)+ "%";
            }
        }

    }

    hide() {
        if (this.init) {
            this.setState({
                style: {
                    width: '101%'
                },
                loading: 0
            });

            setTimeout(function () {
                this.setState({
                    style: {
                        opacity: 0,
                        display: 'none',
                        width: '1%'
                    }
                });
            }.bind(this), 800);
        }
    }

    componentDidMount() {
        this.init = true;
        this.setProcess();

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loading == 0) {
            this.hide();
        } else {
            this.setProcess();
        }
    }

    render() {
        let style = this.style;
        return (
            <div ref={this.moduleName} style={Object.assign({},style.loadingbar,this.state.style)}>
                <i style={Object.assign({},style.i,style.bi)}></i>
                <b style={Object.assign({},style.b,style.bi)}></b>
            </div>
        );
    }
}