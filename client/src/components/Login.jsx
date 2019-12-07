import React from 'react';
import { Redirect } from 'react-router-dom';

function Login(props) {
    return (
        <div class="Login body-component">
            <button onClick={() => {
                props.login(() => {
                    return <Redirect to="/" />
                });
            }}>
                login
            </button>
        </div>
    );
}

export default Login;