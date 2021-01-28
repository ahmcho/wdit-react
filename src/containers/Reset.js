import {useState} from 'react';
import {connect} from 'react-redux';
import { withRouter, Redirect } from "react-router-dom";
import wditAPI from '../api/wdit';
import errorHandler from '../utils/errorHandler';
import SuperPasswordField from '../components/SuperPasswordField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loader from 'react-loader-spinner';

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
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

const Reset = ({ match, history,auth }) => {
    const { params: { token }} = match;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showLoader, setShowloader] = useState(false);
    const [matchPasswords, setMatchPasswords] = useState(true);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const classes = useStyles();
    
    const onPasswordChange = (e) => setPassword(e.target.value.replace(/\s/g,''));
    const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value.replace(/\s/g,''));

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }
    
    const onSubmit = async (e) => { 
        e.preventDefault();
        if(password === confirmPassword){
            setMatchPasswords(true);
            try {
                setShowloader(!showLoader);
                const response = await wditAPI.put(`/api/users/reset/${token}`, {
                    password,
                    confirm: confirmPassword
                });
                const key = enqueueSnackbar(response.data.message, {
                    variant: 'success',
                    transitionDuration: 400,
                    preventDuplicate: true,
                    onExited: () => {
                        history.push('/login')
                    },
                    onClick: () => {
                        closeSnackbar(key);
                    },
                    anchorOrigin: {
                      vertical: 'bottom', 
                      horizontal: 'center'
                    }
                });
                setShowloader(false);
                setPassword('');
                setConfirmPassword('');
            } catch (error) {
                enqueueSnackbar(errorHandler(error), { 
                    variant: 'error',
                    autoHideDuration: 2000,
                    transitionDuration: 600,
                    anchorOrigin: {
                      vertical: 'bottom', 
                      horizontal: 'center'
                    }
                });
                setShowloader(false);
            }
        } else {
            setMatchPasswords(false);
            enqueueSnackbar('Passwords do not match', { 
                variant: 'error',
                autoHideDuration: 2000,
                transitionDuration: 400,
                anchorOrigin: {
                  vertical: 'bottom', 
                  horizontal: 'center'
                }
            });
        }
    }

    return(
        <Container component="main" maxWidth="xs">
            {auth.isAuthenticated && (
                <Redirect to='/dashboard' />
            )}
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <RotateLeftIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Your Password
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <SuperPasswordField 
                        handleClickShowPassword={handleClickShowPassword}
                        value={password}
                        onChange={onPasswordChange}
                        showPassword={showPassword}
                        error={!matchPasswords && true}
                        placeholder="Enter your new password"
                        name="password"
                        id="password"
                        label="Password"
                    />
                    <SuperPasswordField 
                        handleClickShowPassword={handleClickShowConfirmPassword}
                        id="confirmPassword"
                        label="Confirm password"
                        name="confirm-password"
                        placeholder="Confirm the password"
                        showPassword={showConfirmPassword}
                        password={confirmPassword}
                        onChange={onConfirmPasswordChange}
                        error={!matchPasswords && true}
                        value={confirmPassword}
                    />
                    {showLoader ? (
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
                    ): (
                        <Button
                            type="submit"
                            fullWidth
                            height={60}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        > 
                            Reset    
                        </Button>
                    )}
                </form>
            </div>
        </Container> 
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(
    mapStateToProps
)(withRouter(Reset));