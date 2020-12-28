const Locate = ({mapRef}) => {
    return(
      <button 
          className="locate"
          onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
                mapRef.current.panTo({lat:position.coords.latitude,lng: position.coords.longitude});
                mapRef.current.setZoom(14);
            }, () => null)
          }}
          title="Get current location"
        >
        <img width="40px" src="locate.png" alt="compass-locate me"/>
      </button>
    )
}

export default Locate;