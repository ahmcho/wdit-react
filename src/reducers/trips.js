import { GET_TRIPS, UPDATE_TRIP, CREATE_TRIP, DELETE_TRIP, RESET } from "../actions/types";

const initialState = [];

const trips = (state = initialState, action) => {
    switch (action.type) {
      case GET_TRIPS:
        return Object.assign({}, state, action.payload);
      case CREATE_TRIP:
        let newState = [];
        for(let trip of Object.values(state)){
          newState.push(trip);
        }
        newState.push(action.payload.data);
        return newState;
      case UPDATE_TRIP:
        let keys = Object.keys(action.payload.data);
        return Object.values(state).map((trip) => trip._id === action.payload.id ? (
          Object.assign({}, trip, keys.forEach(key => {
            key === 'rating' ? trip[key] = +action.payload.data[key] : trip[key] = action.payload.data[key]
         }))
        ) : trip)
      case DELETE_TRIP:
        return Object.values(state).filter(trip => trip._id !== action.payload);
      case RESET:
        return initialState;
      default:
        return state;
    }
  }
  
  export default trips;