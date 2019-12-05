import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

ReactDOM.render(
  <HashRouter basename="/">
    <App />
    </HashRouter>,
  document.getElementById('root')
);
