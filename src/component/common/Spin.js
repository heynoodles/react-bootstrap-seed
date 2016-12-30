/**
 * Created by jianheng.he on 16/5/3.
 */
import React, {PropTypes} from 'react';
import Spinner from './spinner';

export default class Spin extends React.Component {
    static propTypes = {
        // This object is passed in wholesale as the spinner config
        config: PropTypes.object,
        // This is a quick way to overwrite just the color on the config
        color: PropTypes.string.isRequired,
    };
    static defaultProps = {
        config: {
            lines: 13, // The number of lines to draw,
            length: 5 // The length of each line
            , width: 2 // The line thickness
            , radius: 8 // The radius of the inner circle
            , scale: 1 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: 'rgb(230, 230, 220)' // #rgb or #rrggbb or array of colors
            , opacity: 0.25 // Opacity of the lines
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1.5 // Rounds per second
            , trail: 65 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '50%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
        },
        color: 'black',
    };

    componentDidMount() {
        const {color, config} = this.props;
        const spinConfig = {
            // a few sensible defaults
            width: 2,
            radius: 10,
            length: 7,
            // color should not overwrite config
            color,
            // config will overwrite anything else
            ...config,
        };

        this.spinner = new Spinner(spinConfig);
        this.spinner.spin(this.refs.container);
    }

    componentWillUnmount() {
        this.spinner.stop();
    }

    render() {
        let wrapper = {
            position: 'fixed',
            top: '0px',
            left: '0px',
            zIndex: '9999',
            background: 'rgba(0, 0, 0, .5)',
            width: '100%',
            height: '100%'
        };
        let title = {
            position: 'fixed',
            top: '53%',
            left: '42%',
            zIndex: '9999',
            width: '200px',
            height: '50px',
            color: 'rgb(255,255,255)',
            textAlign: 'center', fontSize: '13px'
        };
        let progress = this.props.progress;
        let outer = {
            display: progress ? 'block' : 'none',
            width: '200px', height: '6px', position: 'fixed', borderRadius: '3px',
            border: '1px solid white', left: '42%', top: '57%'
        };
        let inner = {
            width: progress + '%', height: '100%', background: 'rgb(240,240,240)'
        };
        return (
            <div style={Object.assign(wrapper,{visibility:this.props.show?'visible':'hidden'})}>
                <span ref="container"></span>
                <div style={title}><span>{this.props.title}</span></div>
                <div style={outer}>
                    <div style={inner}></div>
                </div>
            </div>
        );
    }
}