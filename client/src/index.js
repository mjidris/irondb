import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App';
import Database from './components/Database';
import DataEntry from './components/DataEntry';
import Help from './components/Help';
import Panel from './components/Panel';
import Profile from './components/Profile';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
  
const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route {...rest} render={(props) => (
        authenticated === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
)

class Routing extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    state = {
        isAuthenticated: false
    }

    login(callback) {
        this.setState({isAuthenticated: true});
        callback();
    }

    logout(callback) {
        this.setState({isAuthenticated: false});
        callback();
    }

    render() {
        return (
            <Router>
                <div>
                    <Navbar authenticated={this.state.isAuthenticated} />
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route path="/database" component={Database}/>
                        <Route path="/help" render={()=> <Help authenticated={this.state.isAuthenticated} />} />
                        <ProtectedRoute path="/panel" authenticated={this.state.isAuthenticated} component={Panel}/>
                        <ProtectedRoute path="/data-entry" authenticated={this.state.isAuthenticated} component={DataEntry}/>
                        <ProtectedRoute path="/profile" authenticated={this.state.isAuthenticated} component={Profile}/>
                        <Route path="/login" render={()=> <Login login={this.login} />} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
