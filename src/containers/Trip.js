import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getTrips,deleteTrip, updateTrip} from '../actions/trips';
import UpdateIcon from '@material-ui/icons/Update';
import Grid from '@material-ui/core/Grid';
import Loader from 'react-loader-spinner'
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
                    startIcon={<UpdateIcon />}
                    handleUpdate={updateTrip}
                />
            ):(
                <Grid container>
                    <Grid item xs align="center">
                        <Loader
                            type="Rings"
                            color="#3f51b5"
                            height={100}
                            width={100}
                        />
                    </Grid>
                </Grid>
            )}
        </>

    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error,
    ui: state.ui,
    trips: state.trips
});
  
export default connect(
    mapStateToProps,
    { getTrips,deleteTrip,updateTrip }
)(Trip);