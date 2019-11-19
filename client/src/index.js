import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import Search from './components/Search';
import Navbar from './components/Navbar';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Navbar />, document.getElementById('navbar'));
ReactDOM.render(<Search />, document.getElementById('search'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
