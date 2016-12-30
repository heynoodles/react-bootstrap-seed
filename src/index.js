import React from 'react';
import ReactDom from 'react-dom';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.css';
require('../less/index.less');

ReactDom.render(
    <App />,
    document.getElementById('root')
);