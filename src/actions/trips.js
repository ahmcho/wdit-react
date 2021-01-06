import wditAPI from '../api/wdit';
import jwt_decode from "jwt-decode";

import { GET_ERRORS, GET_TRIP, GET_TRIPS, UPDATE_TRIP, CREATE_TRIP, DELETE_TRIP } from "../actions/types";

// Register User
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