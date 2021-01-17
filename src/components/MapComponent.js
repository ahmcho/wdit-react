import React, { useState, memo, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link as RouterLink } from 'react-router-dom';
import { GoogleMap, useLoadScript, InfoWindow } from '@react-google-maps/api';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Locate from './Locate';
import MarkerList from './MarkerList';
import RatingBar from './RatingBar';

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
                  <Typography variant="subtitle1">
                    <Link 
                      underline="none"
                      component={RouterLink}
                      to={`/trips/${selected._id}`}>
                      {selected.description}
                    </Link>
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    <RatingBar data={selected.rating} />
                  </Typography>
                </>
              </InfoWindow>
            )
          }
        </GoogleMap>
      </>
    );
}

export default memo(MapComponent)