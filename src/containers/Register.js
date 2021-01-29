import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import { registerUser } from "../actions/auth";
import { startLoading, stopLoading } from '../actions/ui';
import { clearErrors } from "../actions/error";
import ErrorMessage from '../components/ErrorMessage';
import useStyles from '../config/styles';
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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Loader from 'react-loader-spinner'



const Register = ({auth, error, registerUser, ui, startLoading, stopLoading, clearErrors, history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const classes = useStyles();

    
    useEffect(() => {
        clearErrors();
        if (auth.isAuthenticated) {
            history.push("/dashboard");
        }
    }, [auth,clearErrors,history]);
    
    const onNameChange = (e) => setName(e.target.value);
    const onAgeChange = (e) => setAge(e.target.value);
    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        clearErrors();
        const userData = { email, password, name,age };
        startLoading();
        await registerUser(userData, history);
        stopLoading();
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.forgotPaper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {error && (
                    <Typography variant="subtitle1">
                        <ErrorMessage message={error}/>
                    </Typography>
                )}
                <form className={classes.authForm} onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            id="firstName"
                            label="Name"
                            value={name}
                            onChange={onNameChange}
                            autoFocus
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            type="number"
                            id="lastName"
                            label="Age"
                            error={error !== '' ? error.includes('age') : false }
                            name="lastName"
                            autoComplete="lname"
                            value={age}
                            onChange={onAgeChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            id="email"
                            type="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            error={error !== '' ? error.includes('email'): false}
                            value={email}
                            onChange={onEmailChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        error={error !== '' ? error.includes('password'): false}
                        type={showPassword ? 'text' : 'password'}
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
                    </Grid>
                </Grid>
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
                        className={classes.authSubmit}
                    >
                        Register
                    </Button>                
                )}
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
        </Container>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error,
    ui: state.ui
});
  
export default withRouter(connect(
    mapStateToProps,
    { registerUser, startLoading, stopLoading, clearErrors }
)(Register));