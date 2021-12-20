import { getUserDetails, changePassword, editUserDetails } from "api";
import { ActionTypes } from "../constants/actionTypes";
import { toast } from "react-toastify";

export const fetchProfileAction = (id) => async (dispatch) => {
  dispatch({
    type: ActionTypes.LOADING,
    payload: true,
  });
  try {
    const response = await getUserDetails(id);

    dispatch({
      type: ActionTypes.FETCH_PROFILE,
      payload: response.data?.data,
    });
    dispatch({
      type: ActionTypes.LOADING,
      payload: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProfileAction = (data) => async (dispatch) => {
  try {
    const response = await editUserDetails(data);
    if (response) {
      toast.success(response.data?.message);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const changePasswordAction = (data) => async (dispatch) => {
  try {
    const response = await changePassword(data);
    if (response) {
      toast.success(response.data?.message);
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.log(error);
  }
};
