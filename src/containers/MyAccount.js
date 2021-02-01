import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import { createTrip } from '../actions/trips';
import { logoutUser, deleteUser } from '../actions/auth';
import TripForm from '../components/TripForm';
import TabPanel from '../components/TabPanel';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
//Components
import Alert from '../components/Alert';
import TripList from '../components/TripList';
import useStyles from '../config/styles';
//Icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Paper, Typography } from '@material-ui/core';

  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
const MyAccount = ({auth, trips, error, logoutUser, deleteUser}) => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        setOpen(false);
        //delete account
        deleteUser(); 
    }

    const handleDisagree = () => {
        setOpen(false);
        //dont delete account
    }

    useEffect(() => {
        error.toString().includes('Unauthorized') && logoutUser();
    }, [auth, error,logoutUser]);

    return (
        <Container maxWidth="sm" spacing={3}>
            {error.toString().includes('Unauthorized') && (
                <Redirect to="/login"/>
            )}
            <Grid container justify="center" alignItems="center" spacing={3}>
                <Grid item xs={12}>
                    <AppBar position="static">
                        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Manage" {...a11yProps(0)} icon={<ListIcon />} />
                            <Tab label="Create" {...a11yProps(1)} icon={<AddIcon />} />
                            <Tab label="Settings" {...a11yProps(2)} icon={<SettingsIcon />} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <Container maxWidth="sm" spacing={3}>
                            <div className={classes.paper}>
                                <Grid container justify="center" alignItems="center" spacing={3}>
                                    <Grid item xs={12}>
                                        <Paper className={classes.paper}>
                                            <Typography variant="h4">
                                                Manage your trips
                                                    </Typography>
                                        </Paper>
                                    </Grid>
                                    <TripList trips={trips} />
                                </Grid>
                            </div>
                        </Container>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TripForm
                            formTitle="Add a trip"
                            buttonTitle="Create"
                            startIcon={<AddIcon />}
                            onSubmit={createTrip}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Grid container justify="center" alignItems="center" spacing={3}>
                            <Grid item xs={12}>
                                <Button
                                    height={60}
                                    variant="contained"
                                    className={classes.delete}
                                    color="primary"
                                    onClick={handleClickOpen}
                                    endIcon={<DeleteForeverIcon />}
                                >
                                    Delete your account
                                        </Button>
                                <Alert
                                    open={open}
                                    text="This action is permanent! Your account and all trips associated with it will be removed!"
                                    title="Are you sure?"
                                    handleClose={handleClose}
                                    handleDisagree={handleDisagree}
                                    handleAgree={handleAgree}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error,
    trips: state.trips
});
  
export default connect(
    mapStateToProps,
    {createTrip, logoutUser, deleteUser }
)(MyAccount);
  