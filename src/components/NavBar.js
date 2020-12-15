import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [token, setToken] = useState('');
  useEffect( () => {
    const acquiredToken = localStorage.getItem("token");
    if(acquiredToken){
      setToken(acquiredToken);
    }
  },[token]);

    return(
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          { !token ? (
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

export default NavBar;