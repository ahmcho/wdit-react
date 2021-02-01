import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const Private = ({ auth, component: Component, ...rest}) => (
    <Route  {...rest} component={ (props) => (
        auth.isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )
    )}/>
);

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Private);