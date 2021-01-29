import {useState} from 'react';
import wditAPI from '../api/wdit';
import {connect} from 'react-redux';
import { Redirect } from "react-router-dom";
import useStyles from '../config/styles';
//Material UI components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Loader from 'react-loader-spinner';
import { useSnackbar } from 'notistack';



const Forgot = ({auth}) => {
    const [email, setEmail] = useState('');
    const [showLoader, setShowloader] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    const classes = useStyles();
    
    const onEmailChange = (e) => setEmail(e.target.value);

    const onSubmit = async (e) => { 
        e.preventDefault();
        const key = enqueueSnackbar('You will receive an email, if your entry matches our records', {
            variant: 'info',
            transitionDuration: 400,
            onClick: () => {
                closeSnackbar(key);
            },
            anchorOrigin: {
              vertical: 'bottom', 
              horizontal: 'center'
            }
        });
        setShowloader(!showLoader);
        try {
            const response = await wditAPI.post('/api/users/forgot', {email});
            setEmail('');
            enqueueSnackbar(response.data.message, {
                variant: 'success',
                transitionDuration: 400,
                preventDuplicate: true,
                onClick: () => {
                    closeSnackbar(key);
                },
                anchorOrigin: {
                  vertical: 'bottom', 
                  horizontal: 'center'
                }
            });
            setShowloader(false);
        } catch (error) {
            setTimeout(() => {
                enqueueSnackbar(error, { 
                    variant: 'error',
                    autoHideDuration: 2000,
                    transitionDuration: 400,
                    anchorOrigin: {
                      vertical: 'bottom', 
                      horizontal: 'center'
                    }
                });
            }, 1000)
            
            setShowloader(false);
        }
    }

    return(
        <Container component="main" maxWidth="xs">
            {auth.isAuthenticated && (
                <Redirect to='/dashboard' />
            )}
            <CssBaseline />
            <div className={classes.authPaper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot password?
                </Typography>
                <form className={classes.forgotForm} onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id="email"
                        type="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        placeholder="Enter email you want to reset"
                        value={email}
                        onChange={onEmailChange}
                        fullWidth
                        required
                        autoFocus
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
                            className={classes.forgotSubmit}
                        > 
                            Submit    
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
)(Forgot);