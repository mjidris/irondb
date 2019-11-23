import React from 'react';
import './styles/App.scss';
import { Route, Redirect, Link, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className="body-component">
        <header className="App-header body-component">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </div>
  );
}

export default App;
