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
                    icon={{
                      url: '/luggage.png',
                      scaledSize: new window.google.maps.Size(30,30),
                      origin: new window.google.maps.Point(0,0),
                      anchor: new window.google.maps.Point(15,15)
                    }}
            />
        })}
    </>
)


export default MarkerList;