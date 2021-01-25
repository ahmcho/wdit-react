import {useState} from 'react';
import wditAPI from '../api/wdit';
//Material UI components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Loader from 'react-loader-spinner';
import { useSnackbar } from 'notistack';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
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

const Forgot = ({history}) => {
    const [email, setEmail] = useState('');
    const [showLoader, setShowloader] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    
    const classes = useStyles();
    

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
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot password?
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
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
                        onChange={(e) => setEmail(e.target.value)}
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
                            className={classes.submit}
                        > 
                            Submit    
                        </Button>
                    )}
                </form>
            </div>
        </Container> 
    )
}

export default Forgot;