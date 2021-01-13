import React, {useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import {getTrips} from '../actions/trips';
import MapComponent from '../components/MapComponent';


const Landing = ({auth, trips, error}) => {
    const history = useHistory(); 
    useEffect(() => {
        return history.listen((location,action) => {
            return auth.isAuthenticated ? getTrips() : null;
        })
    },[auth, history, trips]);
    
    let areTripsEmpty = trips.length === 0;
    return (
        <section>
            <h1>WhereDidITravel?</h1>
            {auth.isAuthenticated ? (
                <>
                    {!areTripsEmpty ? (
                        <>
                            <MapComponent trips={trips}/>
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
    error: state.error,
    trips: state.trips
});
  
export default connect(
    mapStateToProps,
    {getTrips}
)(Landing);