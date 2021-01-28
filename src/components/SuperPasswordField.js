import {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';


const SuperPasswordField = ({ label, id, name, placeholder, handleClickShowPassword, value, onChange, showPassword, error }) => {
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    return(
        <TextField
            variant="outlined"
            margin="normal"
            id={id}
            type={showPassword ? 'text' : 'password'}
            label={label}
            name={name}
            error={error}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
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
    )
}

export default SuperPasswordField;