import React, {useState} from 'react';
import { withRouter } from "react-router-dom";
import {useDispatch} from 'react-redux';
import ErrorMessage from './ErrorMessage';

const TripForm = ({formTitle, buttonTitle, data='', handleDelete, handleUpdate, onSubmit, history}) => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState(data.description||'');
    const [location, setLocation] = useState(data.location||'');
    const [rating, setRating] = useState(data.rating||'');
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
    
    return(
        <div>
            <h1>{formTitle || 'Add a trip'}</h1>
            <ErrorMessage message={errorMessage}/>
            <form onSubmit={async (e) => {
                e.preventDefault();
                if(data){
                    await handleUpdate(data._id, {description, rating});
                    history.push('/');
                } else {
                    await dispatch(onSubmit({description,location,rating}));
                    history.push('/');
                }
            }}>
                <input 
                    type="text"
                    name="description"
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value) }
                    onInvalid={handleValidity}
                    onInput={handleInput}
                    required={true}
                />
                <input 
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={location}
                    disabled={data}
                    onChange={(e) => setLocation(e.target.value)}
                    onInvalid={handleValidity}
                    onInput={handleInput}
                    required={true}
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating"
                    min="0"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <button>{buttonTitle || 'Submit'}</button>
            </form>
            {data ? (<button onClick={()=>doDelete()}>Delete</button>) : null }
        </div>
    )
}

export default withRouter(TripForm);