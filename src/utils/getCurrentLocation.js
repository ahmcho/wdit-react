const setPositionFromGeolocation = async () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser!')
    }
    try {
        const res = await	new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(res, rej);
        });
        return {
            lat: res.coords.latitude,
            lng: res.coords.longitude
        }
    } catch (error) {
        console.error(error);
    }
}

export default setPositionFromGeolocation;