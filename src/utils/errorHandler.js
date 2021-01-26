const errorHandler = (error) => {
    if (typeof error === 'string') {
        let message = '';
        if (error.includes('email')) {
            if (error.includes('in use')) {
                return error;
            }
            message += 'Email is required! ';
        }
        if (error.includes('password')) {
            switch (error.includes('password')) {
                case error.includes('not a secure'):
                    message += 'Password is not secure! ';
                    break;
                case error.includes('shorter'):
                    message += 'Password is short! ';
                    break;
                default:
                    message += 'Password is required! ';
            }
        }
        if (error.includes('name')) {
            message += 'Name is required! ';
        }
        if (error.includes('age')) {
            message += error.split('age: ')[1];
        }

        return message;
    }
}

export default errorHandler;