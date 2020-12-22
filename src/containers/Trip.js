import React, {useEffect, useState} from 'react';
import wditAPI from '../api/wdit';
import TripForm from '../components/TripForm';

const Trip = ({match}) => {
    const { params: { tripId }} = match;
    const [tripData, setTripData] = useState({});

    useEffect( () => {
        const getTripInfo = async () => {
            try {
                const res = await wditAPI.get(`/api/trips/${tripId}`);
                setTripData(res.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getTripInfo();
    }, [tripId]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await wditAPI.delete(`/api/trips/${tripData._id}`);
            window.location.href = "/"
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <>
            {tripData._id && (
                <TripForm 
                    formTitle="Edit Your Trip"
                    buttonTitle="Update"
                    data={tripData}
                    handleDelete={handleDelete}    
                />
            )}
        </>

    )
}

export default Trip;