import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = '';

const error = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
}

export default error;