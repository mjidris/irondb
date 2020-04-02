/* React Imports */
import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useContext } from 'react';
/* Default Imports */
import Login from './pages/Login';
import Auth from './Auth';
import Main from './pages/Main'
/* Named Imports */
import {UserContext, UserContextProvider} from '../userContext.js';
/* CSS Imports */
import './styles/App.css';
import '../index.css';

class App extends React.Component {

  componentDidMount() {}

  render() {
    const value = {
      user: this.state.user,
      logoutUser: this.logout
    }

    return (
        <div className="App">
          <Main />
        </div>  
    );
  }
}

export default App;
