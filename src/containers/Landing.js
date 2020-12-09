import React,{useEffect, useState} from 'react';
import wditAPI from '../api/wdit';

const Landing = () => {
    const [message, setMessage] = useState('');
    const [trips, setTrips] = useState('')
    useEffect( () => {
        const getTrips = async () => {
            try {
                const res = await wditAPI.get('/api/trips');
                const foundData = res.data.data;
                console.log(foundData)
                setTrips(foundData)
            } catch (error) {
                setMessage('No trips found')
            }
            
        }
        getTrips();
    },[])

    return(
        <h3>
            WhereDidITravel?
            <p>{message}</p>
            {Object.values(trips).map(trip =>{
                return <p key={trip._id}>{trip.location}</p>
            })}
        </h3>
    )
}

export default Landing;