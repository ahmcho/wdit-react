import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { loginUser } from "../actions/auth";
import { clearErrors } from "../actions/error";

//import AuthForm from '../components/AuthForm';

const Login = ({ auth, error, loginUser,clearErrors, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        clearErrors();
        if (auth.isAuthenticated) {
            history.push("/dashboard");
        }
    }, [auth]);
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        loginUser(userData);
    }

    return (
        <div>
            <p>Sign in to your account</p>
                {error && (
                    <p style={{color: 'red'}}>{Object.values(error)}</p>
                )}
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
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
  )(Login);