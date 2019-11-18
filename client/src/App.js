import React from 'react';
import './css/App.css';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <body>
        <div className="Navbar"><Navbar /></div>
        <div className="container-fluid pt-3 pb-5" id="top-container">
          <div className="d-flex flex-row align-items-center justify-content-center mt-5 mb-2">
              <h1>Iron Meteorite Database</h1>
          </div>
      	</div>
      </body>
    </div>
  );
}

export default App;
