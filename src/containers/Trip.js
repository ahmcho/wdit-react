import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getTrips,deleteTrip, updateTrip} from '../actions/trips';

import TripForm from '../components/TripForm';

const Trip = ({auth,error, match,trips, getTrips, deleteTrip, updateTrip, history}) => {
    const { params: { tripId }} = match;
    
    const [singleTrip, setSingleTrip] = useState(Object.values(trips).filter(trip => trip._id === tripId)[0]);

    useEffect(() => {
        setSingleTrip(Object.values(trips).filter(trip => trip._id === tripId)[0]);
    },[auth.isAuthenticaded,trips, tripId, getTrips, history])
    
    
    return(
        <>  
            {singleTrip ? (
                <TripForm 
                    formTitle="Edit Your Trip"
                    buttonTitle="Update"
                    data={singleTrip}
                    handleDelete={deleteTrip}
                    handleUpdate={updateTrip}
                />
            ):(
                <h1>Loading...</h1>
            )}
        </>

    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error,
    trips: state.trips
});
  
export default connect(
    mapStateToProps,
    { getTrips,deleteTrip,updateTrip}
)(Trip);