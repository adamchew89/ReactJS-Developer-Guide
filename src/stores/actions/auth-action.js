// Libraries
import axios from "axios";
// ActionTypes
import * as ActionTypes from "./action-types";

const url = "https://identitytoolkit.googleapis.com/v1/accounts";
const apiKey = "AIzaSyDORn001mDlaIpoXf8n3Jh2MqFPzXlMPmk";

export const authStart = () => {
  return { type: ActionTypes.AUTH_START };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: ActionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authLogout = () => {
  return {
    type: ActionTypes.AUTH_LOGOUT
  };
};

export const authFail = error => {
  return { type: ActionTypes.AUTH_FAIL, error };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => dispatch(authLogout()), expirationTime);
  };
};

export const auth = (email, password, isSignUp) => {
  console.log({ email, password, isSignUp });
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let apiUrl = `${url}:signUp?key=${apiKey}`;
    if (!isSignUp) {
      apiUrl = `${url}:signInWithPassword?key=${apiKey}`;
    }
    console.log({ apiUrl });
    axios
      .post(apiUrl, authData)
      .then(response => {
        console.log({ response });
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
      })
      .catch(error => {
        console.log({ error });
        dispatch(authFail(error.response.data.error));
      });
  };
};
