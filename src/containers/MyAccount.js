import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import { createTrip } from '../actions/trips';
import TripForm from '../components/TripForm';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

const MyAccount = ({auth}) => {
    const [name, setName] = useState('');
    
    useEffect(() => {
        auth.isAuthenticated && ( setName(auth.user.name) )
    }, [auth]);


    return (
        <Container maxWidth="sm" spacing={3}>
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
    auth: state.auth
});
  
export default connect(
    mapStateToProps,
    {createTrip }
)(MyAccount);
  