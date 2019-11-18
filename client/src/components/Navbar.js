import React from 'react';
import '../css/navbar.css';
import nasaLogo from '../assets/nasa-logo-web-rgb.png';
import psycheLogo from '../assets/Psyche_BadgeSolid_Color-PNG.png';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar fixed-top navbar-expand navbar-dark">
          <div className="navbar-brand">
            <img src={nasaLogo} id="nasa-logo" width="40" height="40"  class="pl-0 ml-0" alt="NASA Logo" />
            <img src={psycheLogo} id="psyche-logo" width="30" height="30" alt="Psyche Mission Logo" />
          </div>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/">Home</a>
            <a className="nav-item nav-link" href="/database">Database</a>
            <a className="nav-item nav-link" href="/help">Help</a>
          </div>
        </div>
        <a href="/login" className="btn btn-outline-light">Sign in</a>
      </nav>
    );
  }
}

export default Navbar;
