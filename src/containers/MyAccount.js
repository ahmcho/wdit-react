import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom';
import { logoutUser } from '../actions/auth';
import { createTrip } from '../actions/trips';
import TripForm from '../components/TripForm';

const MyAccount = ({auth,logoutUser}) => {
    const [name, setName] = useState('');
    
    useEffect(() => {
        auth.isAuthenticated && ( setName(auth.user.name) )
    }, [auth]);

    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser();
    }

    return (
        <div>
            {auth.isAuthenticated 
                ? (
                    <div>
                        <p>Welcome, {name}!</p>
                        <TripForm 
                            formTitle="Add a trip"
                            buttonTitle="Create"
                            onSubmit={createTrip}
                        />
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                ) : (
                    <Redirect to='/login' />
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(
    mapStateToProps,
    { logoutUser, createTrip }
)(MyAccount);
  