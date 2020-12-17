import React from 'react';
import { Marker } from '@react-google-maps/api';

const MarkerList = ({markers, onSelect}) => (
    <>
        {Array.from(markers).map(trip => {
        const position = {
          lng: trip.geometry.coordinates[0],
          lat: trip.geometry.coordinates[1]
        }
        return <Marker 
                key={trip._id}
                position={position}
                onClick={() => onSelect(trip)}
            />
    })}
    </>
)


export default MarkerList;