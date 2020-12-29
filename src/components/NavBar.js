import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

const NavBar = ({auth}) => {
    return(
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {!auth.isAuthenticated  ? (
            <div>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </div>
          ) : (
            <li>
              <Link to="/dashboard">My Account</Link>
            </li>
          )}
      </ul>
    )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(NavBar);