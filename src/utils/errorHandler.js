const errorHandler = (error) => {
    let message = '';
    if(error.includes('email')){
        message += 'Email is required! ';
    }
    if(error.includes('password')){
        switch(error.includes('password')){
            case error.includes('not a secure'):
                message += 'Password is not secure! ';
                break;
            case error.includes('shorter'):
                message += 'Password is short!';
                break;
            default:
                message += 'Password is required! ';
        }
    } 
    if(error.includes('name')){
        message += 'Name is required! ';
    }
    if(error.includes('age')){
        message += 'You are too young to use this service! ';
    }

    return message;
}

export default errorHandler;