import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { withRouter, Redirect } from "react-router-dom"
import { loginUser } from "../actions/auth";
import { clearErrors } from "../actions/error";

//import AuthForm from '../components/AuthForm';

const Login = ({ auth, error, loginUser, clearErrors }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        clearErrors();
    }, [auth, clearErrors]);
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        loginUser(userData);
    }

    return (
        <div>
            {auth.isAuthenticated ? (
                <Redirect to='/dashboard' />
            ) : (
                <>
                    <p>Sign in to your account</p>
                    {error && (
                        <p style={{color: 'red'}}>{Object.values(error)}</p>
                    )}
                    <form onSubmit={onSubmit}>
                        <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button>Login</button>
                    </form>                                         
                </>
            )}
       </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
  });
  
  export default connect(
    mapStateToProps,
    { loginUser, clearErrors }
  )(withRouter(Login));