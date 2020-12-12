import React, {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import TripForm from '../components/TripForm';

const MyAccount = () => {
    const [name, setName] = useState('');

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token){
            const decoded = jwt_decode(token);
            const name = decoded.name;
            setName(name);
        }
    }, []);

    const handleLogout = () => {
        let token = localStorage.getItem('token');
        if(!token){
            this.disabled = true;
        } else {
            localStorage.removeItem('token');
        } 
        window.location.href = "/"
    }

    return (
        <div>
            {name 
                ? (
                    <div>
                        <p>Welcome, {name}!</p>
                        <TripForm />
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                ) : (
                    <p>Unauthorized</p>
                )
            }
        </div>
    )
}

export default MyAccount;