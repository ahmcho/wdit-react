import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import { logoutUser } from '../actions/auth';
import TripForm from '../components/TripForm';

const MyAccount = ({auth,logoutUser}) => {
    const [name, setName] = useState('');
    useEffect(() => {
        if(auth){
            setName(auth.user.name);
        } else {
            setName(null);
        }
    }, [auth]);

    const handleLogout = (e) => {
        e.preventDefault();
        logoutUser();
        window.location.href = "/"
    }

    return (
        <div>
            {name 
                ? (
                    <div>
                        <p>Welcome, {name}!</p>
                        <TripForm 
                            formTitle="Add a trip"
                            buttonTitle="Create"
                        />
                        <button onClick={handleLogout}>Log out</button>
                    </div>
                ) : (
                    <p>Unauthorized</p>
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
    { logoutUser }
)(MyAccount);
  