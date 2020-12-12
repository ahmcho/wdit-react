import React, {useState} from 'react';

const AuthForm = ({ newUser, onSubmit, buttonText }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {newUser && (
                <div>
                    <input type="number" placeholder="Your age" value={age} onChange={(e) => setAge(e.target.value)} />
                    <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            )}
                <button>{buttonText}</button>
            </form>
                
            
        </div>
    )
}

export default AuthForm;