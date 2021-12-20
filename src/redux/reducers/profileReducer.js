import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  profile: {},
  loading: false,
};

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.EDIT_PROFILE:
      return { ...state, profile: payload };
    case ActionTypes.FETCH_PROFILE:
      return { ...state, profile: payload };
    case ActionTypes.LOADING:
      return { ...state, loading: payload };

    default:
      return state;
  }
};
