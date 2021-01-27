import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import { createTrip } from '../actions/trips';
import { logoutUser } from '../actions/auth';
import TripForm from '../components/TripForm';
import TabPanel from '../components/TabPanel';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
const MyAccount = ({auth, error, logoutUser}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    useEffect(() => {
        error.toString().includes('Unauthorized') && logoutUser();
    }, [auth, error,logoutUser]);


    return (
        <Container maxWidth="sm" spacing={3}>
            {error.toString().includes('Unauthorized') && (
                <Redirect to="/login"/>
            )}
            {auth.isAuthenticated 
                ? (
                    <Grid container justify="center" alignItems="center"  spacing={3}>
                        <Grid item xs={12}>
                            <Typography  variant="h4" align="center">
                                Welcome to dashboard
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <AppBar position="static">
                                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Dashboard" {...a11yProps(0)} />
                                <Tab label="Settings" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                <TripForm 
                                    formTitle="Add a trip"
                                    buttonTitle="Create"
                                    startIcon={<AddIcon />}
                                    onSubmit={createTrip}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Some settings placeholder
                            </TabPanel>
                        </Grid>
                    </Grid>
                ) : (
                    <Redirect to='/login' />
                )
            }
        </Container>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});
  
export default connect(
    mapStateToProps,
    {createTrip, logoutUser }
)(MyAccount);
  