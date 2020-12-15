import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import wditAPI from '../api/wdit';

const Landing = () => {
    const [message, setMessage] = useState('');
    const [trips, setTrips] = useState('');
    const [token, setToken] = useState('');
    
    const getTrips = async () => {
        try {
            const res = await wditAPI.get('/api/trips');
            const foundData = res.data.data;
            setTrips(foundData);
        } catch (error) {
            const message = error.message;
            if(message.includes('404')){
                setMessage('No trips found')
            } else {
                setMessage('Unauthorized')
            }
        }
    }

    useEffect( () => {
        const tokenFromStorage = localStorage.getItem('token');
        if(tokenFromStorage === null){
            setToken(null);
            return null;
        } else {
            setToken(tokenFromStorage);
        }
        getTrips();
    },[])

    return(
        <section>
            <h1>WhereDidITravel?</h1>
            {token && (
                <div>
                { trips.length ? 'Here are your trips: ' : ''}
                <MapComponent trips={trips}/>
                </div>
            )}
            {message === "Unauthorized" || token === null ? <Link to="/login">Log In</Link> : ''}
        </section>
    )
}

export default Landing;