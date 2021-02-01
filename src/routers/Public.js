import React from 'react';
import {connect} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const Public = ({ auth, component: Component, ...rest}) => (
    <Route  {...rest} component={ (props) => (
        auth.isAuthenticated ? (
            <Redirect to="/dashboard" />
        ) : (
            <Component {...props} />
        )
    )}/>
);

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Public);