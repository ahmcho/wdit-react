import React, { useState, useEffect } from 'react';
import errorHandler from '../utils/errorHandler';

const ErrorMessage = ({message}) => {
    const [error, setError] = useState('');
    useEffect( () => {
        setError(errorHandler(message));
    }, [message])
    return(
        <>
            {error && (<p style={{color: 'red'}}>{error}</p>)}
        </>
    );

}

export default ErrorMessage;
