import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import MapComponent from '../components/MapComponent';


const Landing = ({auth, trips}) => {
    let areTripsEmpty = Object.keys(trips.trips).length === 0;
    return (
        <section>
            <h1>WhereDidITravel?</h1>
            {auth.isAuthenticated ? (
                <>
                    {!areTripsEmpty ? (
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
    mapStateToProps
)(Landing);