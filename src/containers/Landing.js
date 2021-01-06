import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import MapComponent from '../components/MapComponent';
import {getTrips} from '../actions/trips';


const Landing = ({auth, getTrips, trips}) => {
    useEffect( () => {
        auth.isAuthenticated && ( getTrips() )
    },[auth,getTrips])

    return(
        <section>
            <h1>WhereDidITravel?</h1>
            {auth.isAuthenticated ? (
                <>
                    {trips.trips ? (
                        <>
                            <MapComponent trips={trips.trips}/>
                            <small>Zoom out to see all trips</small>
                        </>
                    ) : 'No trips found'}
                </>
            ):(<Link to="/login">Log In</Link>)}
        </section>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    trips: state.trips
});
  
export default connect(
    mapStateToProps, {
        getTrips
    }
)(Landing);