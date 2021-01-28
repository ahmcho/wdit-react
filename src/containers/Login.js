import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import { withRouter, Redirect, Link as RouterLink } from "react-router-dom"

import { loginUser } from "../actions/auth";
import { startLoading, stopLoading } from "../actions/ui";
import { clearErrors } from "../actions/error";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Loader from 'react-loader-spinner'


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

//import AuthForm from '../components/AuthForm';
const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = ({ auth, ui, error, loginUser, clearErrors, startLoading, stopLoading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    useEffect(() => {
        if(error.length !== 0){
            setOpen(true);
        }
    },[error]);

    useEffect(() => {
        clearErrors();
    }, [auth, clearErrors]);
    
    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        startLoading();
        await loginUser(userData);
        stopLoading();
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            {auth.isAuthenticated ? (
                <Redirect to='/dashboard' />
            ) : (
                <>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            {error.length !== 0 && (
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="error">
                                        {error}
                                    </Alert>
                                </Snackbar>
                            )}
                            <form className={classes.form} onSubmit={onSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    id="email"
                                    type="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={onEmailChange}
                                    error={error.length !== 0}
                                    fullWidth
                                    required
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    error={error.length !== 0}
                                    value={password}
                                    onChange={onPasswordChange}
                                    id="password"
                                    autoComplete="current-password"
                                    InputProps={{ 
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {ui.loading ? (
                                    <Grid container>
                                        <Grid item xs align="center">
                                            <Loader
                                                type="Rings"
                                                color="#3f51b5"
                                                height={100}
                                                width={100}
                                            />
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    > 
                                        Sign In
                                    </Button>
                                )}
                                <Grid container>
                                    <Grid item xs>
                                        <Link variant="body2" component={RouterLink} to="/forgot">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link  variant="body2" component={RouterLink} to="/register">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Container>                                
                </>
            )}
       </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error,
    ui: state.ui
  });
  
  export default connect(
    mapStateToProps,
    { loginUser, clearErrors, startLoading, stopLoading }
  )(withRouter(Login));