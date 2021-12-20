import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  currentUser: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGIN:
      return { ...state, currentUser: payload };
    case ActionTypes.FETCH_CURRENTUSER:
      return { ...state, currentUser: payload };
    case ActionTypes.LOGOUT:
      return { ...state, currentUser: payload };

    default:
      return state;
  }
};
