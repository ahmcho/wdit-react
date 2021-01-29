import mapStyles from './mapStyles';

export const libraries = ["places"];

export const mapContainerStyle = {
    width: '100vw',
    height: '50vh'
};

export const center = {
    lat: 40.3668992,
    lng: 49.81719040000001
};

export const options={
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
};