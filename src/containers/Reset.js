import {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

const Reset = ({ match }) => {
    const { params: { token }} = match;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showLoader, setShowloader] = useState(false);

    const classes = useStyles();

    const onSubmit = (e) => { 
        e.preventDefault();
        setShowloader(!showLoader);
        setTimeout(() => {
            setShowloader(false);
        }, 2000);
    }

    return(
        <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <RotateLeftIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Reset - Token: {token}
                            </Typography>
                            {/* {error && (
                                <Typography component="h1" color="secondary" variant="h5">{Object.values(error)}</Typography>
                            )} */}
                            <form className={classes.form} onSubmit={onSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    id="password"
                                    type="password"
                                    label="Password"
                                    name="password"
                                    placeholder="Enter your new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    required
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    id="confirmPassword"
                                    type="password"
                                    label="Confirm password"
                                    name="confirm-password"
                                    placeholder="Confirm the password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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