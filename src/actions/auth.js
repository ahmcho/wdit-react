import wditAPI from '../api/wdit';
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, RESET,CLEAR_ERRORS } from "./types";

// Register User
export const registerUser =  (userData, history) => async dispatch => {
  try {
    await wditAPI.post("/api/users/register", userData);
    dispatch(setCurrentUser({}));
    history.push('/login');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    })
  }
};

// Login - get user token
export const loginUser = (userData, history) => async dispatch => {
  try {
    const res = await wditAPI.post("/api/users/login", userData);
    const token = res.data.data;
    localStorage.setItem("token", token); 
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    dispatch({ type: CLEAR_ERRORS })
    history.push('/');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    })
  }
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = (history) => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("token");
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch({ type: RESET })
};

export const deleteUser = (history) => async dispatch => {
  //send delete request
  await wditAPI.delete(`/api/users/me`);
  //logout user
  dispatch(logoutUser());
}
