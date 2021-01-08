import React, {useState} from 'react';
import wditAPI from '../api/wdit';
import ErrorMessage from './ErrorMessage';

const TripForm = ({formTitle, buttonTitle, data, handleDelete}) => {
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!data){
                await wditAPI.post('/api/trips', { description, location, rating });
            } else {
                await wditAPI.patch(`/api/trips/${data._id}`, { description, rating });
            }
            window.location.href = "/";
        } catch (error) {
            setErrorMessage(error);
        }
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
            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    name="description"
                    placeholder="Description" 
                    value={data ? data.description : description} 
                    onChange={(e) => setDescription(e.target.value) }
                    onInvalid={handleValidity}
                    onInput={handleInput}
                    required={true}
                />
                <input 
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={data ? data.location : location}
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
                    value={data ? data.rating : rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <button>{buttonTitle || 'Submit'}</button>
            </form>
            {data ? (<button onClick={handleDelete}>Delete</button>) : null }
        </div>
    )
}

TripForm.defaultProps = {
    formTitle: '',
    buttonTitle: '',
    data:''
}

export default TripForm;