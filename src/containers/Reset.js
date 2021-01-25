import {useState} from 'react';
import wditAPI from '../api/wdit';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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

const Reset = ({ match, history }) => {
    const { params: { token }} = match;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showLoader, setShowloader] = useState(false);
    const [matchPasswords, setMatchPasswords] = useState(true);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const classes = useStyles();
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
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
                enqueueSnackbar(error, { 
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
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <RotateLeftIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Your Password
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        name="password"
                        error={!matchPasswords && true}
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value.replace(/\s/g,''))}
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
                        fullWidth
                        required
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Confirm password"
                        error={!matchPasswords && true}
                        name="confirm-password"
                        placeholder="Confirm the password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value.replace(/\s/g,''))}
                        InputProps={{ 
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                        required
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

export default Reset;