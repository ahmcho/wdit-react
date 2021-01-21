import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import { createTrip } from '../actions/trips';
import { logoutUser } from '../actions/auth';
import TripForm from '../components/TripForm';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const MyAccount = ({auth, error, logoutUser}) => {
    const [name, setName] = useState('');
    
    useEffect(() => {
        error.toString().includes('Unauthorized') && logoutUser();
        auth.isAuthenticated && ( setName(auth.user.name) )
    }, [auth, error,logoutUser]);


    return (
        <Container maxWidth="sm" spacing={3}>
            {error.toString().includes('Unauthorized') && (
                <Redirect to="/login"/>
            )}
            {auth.isAuthenticated 
                ? (
                    <>
                        <Typography variant="h4" align="center">
                            Welcome, {name}
                        </Typography>
                        <TripForm 
                            formTitle="Add a trip"
                            buttonTitle="Create"
                            startIcon={<AddIcon />}
                            onSubmit={createTrip}
                        />
                    </>
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
  