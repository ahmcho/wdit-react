import React, {useRef} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from "react-redux";
import { logoutUser } from '../actions/auth';

import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  nav:{
    marginBottom: "1em"
  },
  brand:{
    color: "white"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


const NavBar = ({auth, logoutUser }) => {
  
  const [anchorEl, setAnchorEl] = React.useState();
  const divRef = useRef();
  const classes = useStyles();

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(divRef.current);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

    return(
      <>
        <AppBar className={classes.nav} position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
                <Link 
                  className={classes.brand}
                  underline="none"
                  component={RouterLink}
                  to="/">
                    WhereDidITravel?
                </Link>
            </Typography>
            <Button component={RouterLink} color="inherit" to="/about">About</Button>
            {!auth.isAuthenticated  ? (
            <>
              <Button component={RouterLink} color="inherit" to="/register">Register</Button>
              <Button component={RouterLink} color="inherit" to="/login">Login</Button>
            </>
          ) : (
            <div ref={divRef}>
              <Button color="inherit" startIcon={<AccountCircleIcon />} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Profile
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem key="1" component={RouterLink} to="/dashboard">My Account</MenuItem>
                <MenuItem key="2" onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
          </Toolbar>
        </AppBar>
      </>
    )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {logoutUser}
)(NavBar);