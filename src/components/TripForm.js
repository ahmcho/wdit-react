import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import {useDispatch} from 'react-redux';
import ErrorMessage from './ErrorMessage';
import useStyles from '../config/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



const TripForm = ({formTitle, buttonTitle, data='', handleDelete, handleUpdate, onSubmit, history, startIcon}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [description, setDescription] = useState(data.description||'');
    const [location, setLocation] = useState(data.location||'');
    const [rating, setRating] = useState(data.rating|| 0);
    const [errorMessage, setErrorMessage] = useState('');

   const doDelete = async () => {
       await handleDelete(data._id);
       history.push('/');
   }
    const handleValidity = (e) => {
        e.target.setCustomValidity("");
        if(!e.target.validity.valid){
            e.target.setCustomValidity(`Please provide a valid ${e.target.name}!`);
        }
    }
    const handleInput = (e) => {
        e.target.setCustomValidity("");
    }
    
    const onDescriptionChange = (e) => setDescription(e.target.value);
    const onRatingChange = (e) => setRating(e.target.value);
    const onLocationChange = (e) => setLocation(e.target.value);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        data ? await handleUpdate(data._id, {description, rating}) : await dispatch(onSubmit({description,location,rating}));
        history.push('/');
    }
    return(
        <Container maxWidth="sm" spacing={3}>
         <div className={classes.paper}>
            <Grid container justify="center" alignItems="center"  spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4">
                            {formTitle || 'Add a trip'}
                        </Typography>
                    </Paper>
                </Grid>
                {errorMessage && (
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h5">
                                <ErrorMessage message={errorMessage}/>
                            </Typography>
                        </Paper>
                    </Grid>
                )}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid item xs={8}>
                        <TextField 
                            error={errorMessage.length!==0}
                            name="description"
                            label="Description" 
                            value={description} 
                            onChange={onDescriptionChange}
                            onInvalid={handleValidity}
                            onInput={handleInput}
                            className={classes.field}
                            required
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            type="number"
                            name="rating"
                            label="Rating"
                            fullWidth
                            inputProps={{ min: "0", max: "10" }}
                            value={rating==0?"0":rating}
                            onChange={onRatingChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            error={errorMessage.length!==0}
                            name="location"
                            label="Location"
                            value={location}
                            disabled={!!data}
                            InputProps={{
                                readOnly: !!data,
                            }}
                            onChange={onLocationChange}
                            onInvalid={handleValidity}
                            onInput={handleInput}
                            helperText={data ? "You can not edit location" : null}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth={!data} className={classes.submit} startIcon={startIcon} variant="contained" color="primary">{buttonTitle || 'Submit'}</Button>
                        {data ? (
                            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={()=>doDelete()}>
                                Delete
                            </Button>
                        ): null}
                    </Grid>
                </form>
            </Grid>
         </div>
        </Container>
    )
}

export default withRouter(TripForm);