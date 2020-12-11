import React,{useEffect, useState} from 'react';
import wditAPI from '../api/wdit';

const Landing = () => {
    const [message, setMessage] = useState('');
    const [trips, setTrips] = useState('');
    
    const loginUserAndSetToken = async () => {
        try {
            const res = await wditAPI.post('/api/users/login', {
                email: 'prod_user@test.com',
                password: 'produser134'
            })
            const token = res.data.data;
            console.log('Token :', token);
            await localStorage.setItem('token', token);
            window.location.href = "/"
        } catch (error) {
            setMessage(error.message)
        }
    }
    useEffect( () => {
        const getTrips = async () => {
            try {
                const res = await wditAPI.get('/api/trips');
                
                const foundData = res.data.data;
                console.log(foundData)
                setTrips(foundData)
            } catch (error) {
                const message = error.message;
                if(message.includes('404')){
                    setMessage('No trips found')
                } else {
                    setMessage('Unauthorized')
                }
            }
            
        }
        getTrips();
    },[])

    return(
        <section>
            <h1>WhereDidITravel?</h1>
            {message === "Unauthorized" ? <button onClick={loginUserAndSetToken}>Log In</button> : ''}
            { trips.length ? 'Here are your trips: ' : ''}
            {Object.values(trips).map(trip =>{
                return <p key={trip._id}>Location: {trip.location}</p>
            })}
        </section>
    )
}

export default Landing;