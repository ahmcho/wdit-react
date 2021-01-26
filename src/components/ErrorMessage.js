import React, { useState, useEffect } from 'react';
import errorHandler from '../utils/errorHandler';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ErrorMessage = ({message}) => {
    const [error, setError] = useState('');
    const [open, setOpen] = React.useState(false);
    
    useEffect(() => {
        if(error.length !== 0){
            setOpen(true);
        }
    },[error]);
    
    useEffect( () => {
        setError(errorHandler(message));
    }, [message]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
    return(
        <>
            {error.length !== 0 && (
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </>
    );

}

export default ErrorMessage;
