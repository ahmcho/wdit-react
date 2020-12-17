import React, {useState} from 'react';
import wditAPI from '../api/wdit';
import errorHandler from '../utils/errorHandler';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await wditAPI.post('/api/users/register', {
                email,
                password,
                name,
                age
            })
            window.location.href = "/login"
        } catch (error) {
            setErrorMessage(errorHandler(error));
        }
    }

    return(
        <div>
            <p>Welcome! Here you can register for WhereDidITravel</p>
            <form onSubmit={onSubmit}>
            {errorMessage && (
                    <p style={{color: 'red'}}>{errorMessage}</p>
            )}
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="number" placeholder="Your age" value={age} onChange={(e) => setAge(e.target.value)} />
                <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                <button>Register</button>
            </form>
                
            
        </div>
    );
}

export default Register;