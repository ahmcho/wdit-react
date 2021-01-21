import React, {useEffect} from 'react';
import { Link as RouterLink, useHistory, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {getTrips} from '../actions/trips';
import { startLoading, stopLoading } from '../actions/ui';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Loader from 'react-loader-spinner';
import MapComponent from '../components/MapComponent';

const useStyles = makeStyles((theme) => ({
    typographyStyle: {
        flexGrow: 1,
        textAlign: "center",
    },
    link:{
        justifyContent: "center",
        textAlign: "center",
    }
}));

const Landing = ({auth, trips, error, ui, getTrips, startLoading, stopLoading}) => {
    const classes = useStyles();
    const history = useHistory();
    let areTripsEmpty = trips.length === 0;

    const fetchTrips = async () => {
        startLoading();
        await getTrips();
        stopLoading();
    } 
    useEffect(() => {
        if(areTripsEmpty & auth.isAuthenticated){
            // eslint-disable-next-line
            fetchTrips()
        } 
        return history.listen((location,action) => {
            if(auth.isAuthenticated && location.pathname === '/'){
                // eslint-disable-next-line
                fetchTrips();
            }
        })
    },[auth, history, areTripsEmpty, trips]);
    
    return (
        <Grid container>
            {auth.isAuthenticated ? (
                <>
                    {error !== '' && (
                        <>
                            <Grid item xs={12}>
                                <Typography className={classes.typographyStyle} variant="h6">{error}</Typography>
                            </Grid>
                       </>
                    )}
                    {ui.loading ? (
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
                    ) : 
                        (!areTripsEmpty ?
                            (
                                <>
                                    <MapComponent trips={trips}/>
                                    <Typography className={classes.typographyStyle} variant="subtitle2">Zoom out to see all trips</Typography>
                                </>
                            ) : (
                                <>
                                    <Grid align="center" item xs={12}>
                                        <Button component={RouterLink} to="/dashboard" color="primary"><AddIcon />{"Add a trip"}</Button>
                                    </Grid>
                                </>
                            )   
                        )
                    }
                    
                </>
            ):(<Redirect to="/login"/>)}
        </Grid>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error,
    trips: state.trips,
    ui: state.ui
});
  
export default connect(
    mapStateToProps,
    {getTrips, startLoading, stopLoading}
)(Landing);