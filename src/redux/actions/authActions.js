import { setJWT, cleanLocalStorage, getUserInfoFromJWT } from "utils/storage";
import { loginUser } from "api";
import { ActionTypes } from "../constants/actionTypes";
import { toast } from "react-toastify";

export const loginAction = (data) => async (dispatch) => {
  const response = await loginUser(data);
  console.log(response.data);
  if (response.data?.status === true) {
    await setJWT(response?.data?.data?.token);
    toast.success("Login Successful");
  } else {
    toast.error("Invalid Email or Password");
  }
  const userData = await getUserInfoFromJWT();

  dispatch({
    type: ActionTypes.LOGIN,
    payload: userData,
  });
};

export const fetchUserAction = () => async (dispatch) => {
  const token = await getUserInfoFromJWT();

  dispatch({
    type: ActionTypes.FETCH_CURRENTUSER,
    payload: token,
  });
};

export const logout = () => async (dispatch) => {
  // dispatch({ type: ActionTypes.LOGOUT, payload: { loading: true } });
  cleanLocalStorage();
  // history.push("/auth");
  toast.success("Logout Successful");

  dispatch({
    type: ActionTypes.LOGOUT,
    payload: null,
  });
};
