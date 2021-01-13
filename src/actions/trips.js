import wditAPI from '../api/wdit';

import { GET_ERRORS, GET_TRIPS, UPDATE_TRIP, CREATE_TRIP, DELETE_TRIP } from "../actions/types";

// Get user Trips
export const getTrips =  () => async dispatch => {
    try {
      const trips = await wditAPI.get("/api/trips");
      dispatch({
          type: GET_TRIPS,
          payload: trips.data.data
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    }
};

export const deleteTrip = (id) => async dispatch => {
  try {
    await wditAPI.delete(`/api/trips/${id}`);
    await dispatch({
      type: DELETE_TRIP,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error
    })
  }
}
export const updateTrip = (id, data) => async dispatch => {
  try {
    await wditAPI.patch(`/api/trips/${id}`, data);
    await dispatch({
      type: UPDATE_TRIP,
      payload: {id, data}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error
    })
  }
}
export const createTrip = (data) => async dispatch => {
  try {
    const newTrip = await wditAPI.post('/api/trips/', data);
    dispatch({
      type: CREATE_TRIP,
      payload: newTrip.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error
    })
  }
}
