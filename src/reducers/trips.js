import { GET_TRIP, GET_TRIPS, UPDATE_TRIP, CREATE_TRIP, DELETE_TRIP } from "../actions/types";

const initialState = {
    trips: {},
};

const trips = (state = initialState, action) => {
    switch (action.type) {
      case GET_TRIPS:
        return {
          ...state,
          trips: action.payload
        };
      default:
        return state;
    }
  }
  
  export default trips;