import React from 'react';
import { Marker, MarkerClusterer } from '@react-google-maps/api';

const MarkerList = ({markers, onSelect}) => {
  const trips = Object.values(markers);
  
  let styles = [
    {
      anchorText: [19,23],
      anchorIcon: [22,22],
      backgroundPosition: "0 -5",
      url: './m1.png'
    },
    {
      anchorText: [19,26],
      anchorIcon: [22,22],
      backgroundPosition: "0 -5",
      url: './m2.png'
    },
    {
      anchorText: [19,23],
      anchorIcon: [22,22],
      backgroundPosition: "0 -5",
      url: './m3.png'
    },
    {
      anchorText: [19,23],
      anchorIcon: [22,22],
      backgroundPosition: "0 -5",
      url: './m4.png'
    },
    {
      anchorText: [19,23],
      anchorIcon: [22,22],
      backgroundPosition: "0 -5",
      url: './m5.png'
    }
  ];
  
  const options = {
    imagePath: "/m",
    styles: styles
    
  };
  return(
    <MarkerClusterer options={options}>
        {(clusterer) =>(
          trips.map(trip => {
            const position = {
              lng: trip.geometry.coordinates[0],
              lat: trip.geometry.coordinates[1]
            }
            return <Marker 
                    key={trip._id}
                    position={position}
                    onClick={() => onSelect(trip)}
                    clusterer={clusterer}
                    icon={{
                      url: '/luggage.png',
                      scaledSize: new window.google.maps.Size(30,30),
                      origin: new window.google.maps.Point(0,0),
                      anchor: new window.google.maps.Point(15,15)
                    }}
                  />
          })
      )}
    </MarkerClusterer>
)

}

export default MarkerList;