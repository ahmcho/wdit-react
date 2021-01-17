import React, {useEffect} from 'react';
import { Link as RouterLink, useHistory, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {getTrips} from '../actions/trips';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

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

const Landing = ({auth, trips, error}) => {
    const classes = useStyles();
    const history = useHistory(); 
    useEffect(() => {
        return history.listen((location,action) => {
            return auth.isAuthenticated ? getTrips() : null;
        })
    },[auth, history, trips]);
    
    let areTripsEmpty = trips.length === 0;
    return (
        <Grid container>
            {auth.isAuthenticated ? (
                <>
                    {!areTripsEmpty ? (
                        <>
                            <MapComponent trips={trips}/>
                            <Typography className={classes.typographyStyle} variant="subtitle2">Zoom out to see all trips</Typography>
                        </>
                    ) : (
                        <>
                            <Grid item xs={12}>
                                <Typography className={classes.typographyStyle} variant="h6">No trips found</Typography>
                            </Grid>
                            <Grid align="center" item xs={12}>
                                <Link  variant="body2" component={RouterLink} to="/dashboard">{"Add a trip"}</Link>
                            </Grid>
                        </>
                    )}
                </>
            ):(<Redirect to="/login"/>)}
        </Grid>
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