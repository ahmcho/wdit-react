import React, {useRef} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStyles from '../config/styles';
import { connect } from "react-redux";
import { logoutUser } from '../actions/auth';

import { Link as RouterLink } from 'react-router-dom';


const NavBar = ({auth, logoutUser }) => {
  const divRef = useRef();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(divRef.current);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    setAnchorEl(null);
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
            <div ref={divRef}>
            {!auth.isAuthenticated  ? (
              <>
                <Button component={RouterLink} color="inherit" to="/register">Register</Button>
                <Button component={RouterLink} color="inherit" to="/login">Login</Button>
              </>
            ) : (
              <>
                <Button color="inherit" startIcon={<AccountCircleIcon />} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  {auth.user.name.split(' ')[0]}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={divRef.current}
                  getContentAnchorEl={null}
                  keepMounted
                  open={Boolean(anchorEl)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                  onClose={handleClose}
                >
                  <MenuItem key="1" component={RouterLink} onClick={() => setAnchorEl(null) } to="/dashboard"><DashboardIcon /> Dashboard</MenuItem>
                  <MenuItem key="2" onClick={handleLogout}><ExitToAppIcon/> Logout</MenuItem>
                </Menu>
              </>
            )}
            </div>
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