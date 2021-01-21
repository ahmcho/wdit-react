import { IS_LOADING, DONE_LOADING } from "../actions/types";

const initialState = {
    loading: false
};

const error = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
          ...state,
          loading: true
      };
    case DONE_LOADING:
      return {
          ...state,
          loading: false
      }
    default:
      return state;
  }
}

export default error;