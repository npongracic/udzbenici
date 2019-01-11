import 'core-js/es6/map';
import 'core-js/es6/set';
import 'fetch-ie8';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
