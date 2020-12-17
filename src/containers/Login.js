import React, { useState } from 'react';
//import AuthForm from '../components/AuthForm';
import wditAPI from '../api/wdit';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await wditAPI.post('/api/users/login', {
                email,
                password
            })
            if(res){
                const token = res.data.data;
                await localStorage.setItem('token', token);
                window.location = "/";
            }
        } catch (error) {
            setErrorMessage(error);
        }
    }

    return(
       <div>
            <p>Sign in to your account</p>
                {errorMessage && (
                    <p style={{color: 'red'}}>{errorMessage}</p>
                )}
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
       </div>
    );
}

export default Login;