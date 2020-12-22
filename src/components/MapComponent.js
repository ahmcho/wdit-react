import React, { useState, memo} from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';
import MarkerList from '../components/MarkerList';
import getCurrentLocation from '../utils/getCurrentLocation';

const containerStyle = {
  width: '100%',
  height: '400px'
};

let center;

getCurrentLocation().then((data) => {
  center = data;
})

const MapComponent = ({ trips }) => { 
  const [ selected, setSelected ] = useState({});

  const onSelect = item => setSelected(item);

    return (
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4.5}
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
    </LoadScript>
    );
}

export default memo(MapComponent)