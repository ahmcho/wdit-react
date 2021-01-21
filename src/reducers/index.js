import { combineReducers } from "redux";
import auth from "./auth";
import error from "./error";
import ui  from './ui';
import trips from "./trips";

export default combineReducers({
  auth,
  error,
  trips,
  ui
});