import React, {useState} from 'react';
import wditAPI from '../api/wdit';
import ErrorMessage from './ErrorMessage';

const TripForm = ({formTitle, buttonTitle, data, handleDelete}) => {
    const [description, setDescription] = useState(data.description);
    const [location, setLocation] = useState(data.location);
    const [rating, setRating] = useState(data.rating);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!data){
                await wditAPI.post('/api/trips', { description, location });
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
            {data && (<button onClick={handleDelete}>Delete</button>) }
        </div>
    )
}

TripForm.defaultProps = {
    formTitle: '',
    buttonTitle: '',
    data:''
}
export default TripForm;