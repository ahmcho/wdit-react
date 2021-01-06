import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { registerUser } from "../actions/auth";
import { clearErrors } from "../actions/error";
import ErrorMessage from '../components/ErrorMessage';

const Register = ({auth, error, registerUser, clearErrors, history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    
    useEffect(() => {
        clearErrors();
        if (auth.isAuthenticated) {
            history.push("/dashboard");
        }
    }, [auth,clearErrors,history]);
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        registerUser(userData);
    }

    return(
        <div>
            <p>Welcome! Here you can register for WhereDidITravel</p>
            <ErrorMessage message={error}/>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="number" placeholder="Your age" value={age} onChange={(e) => setAge(e.target.value)} />
                <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                <button>Register</button>
            </form>
                
            
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});
  
export default connect(
    mapStateToProps,
    { registerUser, clearErrors }
)(Register);