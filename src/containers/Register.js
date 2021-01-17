import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import { registerUser } from "../actions/auth";
import { clearErrors } from "../actions/error";
import ErrorMessage from '../components/ErrorMessage';

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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

const Register = ({auth, error, registerUser, clearErrors, history}) => {
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
    
    const onSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password, name,age };
        registerUser(userData, history);
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
            <div className={classes.paper}>
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
                <form className={classes.form} onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            id="firstName"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            error={error !== {} ? error.toString().includes('age') : false }
                            name="lastName"
                            autoComplete="lname"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
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
                            error={error !== {} ? error.toString().includes('email'): false}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Register
                </Button>
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
    error: state.error
});
  
export default withRouter(connect(
    mapStateToProps,
    { registerUser, clearErrors }
)(Register));