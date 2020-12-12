import React, {useState} from 'react';
import wditAPI from '../api/wdit';

const TripForm = () => {
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        await wditAPI.post('/api/trips', { description, location });
        window.location.href = "/";
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleLocation = (e) => {
        setLocation(e.target.value)
    }
    return(
        <div>
            <h1>Add a new trip</h1>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Description" value={description} onChange={handleDescription} />
                <input type="text" placeholder="Location" value={location} onChange={handleLocation} />
                <button>Add a trip</button>
            </form>
        </div>
    )
}

export default TripForm;