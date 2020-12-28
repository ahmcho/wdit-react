import React, { useState, memo, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Locate from '../components/Locate';
import { GoogleMap, useLoadScript, InfoWindow } from '@react-google-maps/api';
import MarkerList from '../components/MarkerList';
import getCurrentLocation from '../utils/getCurrentLocation';

import {libraries,mapContainerStyle,options}  from '../config/settings';

let center;

getCurrentLocation().then((data) => {
  center = data;
});

const MapComponent = ({ trips }) => { 
  const [ selected, setSelected ] = useState({});
  const mapRef = useRef();
  
  const onSelect = item => setSelected(item);
  
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });
  
  // const panTo = useCallback((lat,lng) => {
  //   mapRef.current.panTo({lat,lng});
  //   mapRef.current.setZoom(14);
  // },[]);
  
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    const controlButtonDiv = document.createElement('div');
    ReactDOM.render(<Locate mapRef={mapRef}/>, controlButtonDiv);
    mapRef.current.controls[8].push(controlButtonDiv);
  },[]);

  if(loadError) return 'Error loading maps';
  if(!isLoaded) return "Loading Maps";

    return (
      <>
      {/* <Locate mapRef={mapRef}/> */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          options={options}
          zoom={4.5}
          onLoad={onMapLoad}
        >
          <MarkerList markers={trips} onSelect={onSelect}/>
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
                <>
                  <Link to={`/trips/${selected._id}`}>{selected.description}</Link>
                  <p>Rating: {selected.rating}</p>
                </>
              </InfoWindow>
            )
          }
      </GoogleMap>
      </>
    );
}

export default memo(MapComponent)