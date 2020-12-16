import React, {useEffect, useState, useCallback, memo} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const MapComponent = ({ trips }) => { 
  const [map, setMap] = useState(null);
  const [ selected, setSelected ] = useState({});
  const [ currentPosition, setCurrentPosition ] = useState({});

  const onSelect = item => setSelected(item);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, []);

  const getPosition = () => {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
  }

  const setPositionFromGeolocation = async () => {
    try {
      const res = await	getPosition(); // wait for getPosition to complete
      const currentPosition = {
        lat: res.coords.latitude,
        lng: res.coords.longitude
      }
      setCurrentPosition(currentPosition);
    } catch (error) {
      console.error(error);
    }
    
  }
  
  useEffect(() => {
    setPositionFromGeolocation(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[trips]);
  
    return (
       <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {Array.from(trips).map(trip => {
            const position = {
              lng: trip.geometry.coordinates[0],
              lat: trip.geometry.coordinates[1]
            }
              return (
              <Marker 
                key={trip._id}
                position={position}
                onClick={() => onSelect(trip)}
                />
              )
            })
        }
        {
            selected.geometry && (
              <InfoWindow
              position={{
                lng: selected.geometry.coordinates[0],
                lat: selected.geometry.coordinates[1] 
              }}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>{selected.description}</p>
            </InfoWindow>
            )
         }
        
      </GoogleMap>
    </LoadScript>
      
    );
}

export default memo(MapComponent)