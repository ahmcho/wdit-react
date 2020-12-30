import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import MapComponent from '../components/MapComponent';
import wditAPI from '../api/wdit';

const Landing = ({auth}) => {
    const [message, setMessage] = useState('');
    const [trips, setTrips] = useState({});
    
    const getTrips = async () => {
        try {
            const res = await wditAPI.get('/api/trips');
            const foundData = res.data.data;
            setTrips(foundData);
        } catch (error) {
            setMessage(error);
        }
    }

    useEffect( () => {
        auth.isAuthenticated && ( getTrips() )
    },[auth])

    return(
        <section>
            <h1>WhereDidITravel?</h1>
            {auth.isAuthenticated ? (
                <>
                    {trips.length ? (
                        <>
                            <MapComponent trips={trips}/>
                            <small>Zoom out to see all trips</small>
                        </>
                    ) : 'No trips found'}
                </>
            ):(<Link to="/login">Log In</Link>)}
            {message === "Unauthorized" ? <Link to="/login">Log In</Link> : ''}
        </section>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(
    mapStateToProps
)(Landing);