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
  localStorage.removeItem("idToken");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
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
        const { expiresIn, idToken, localId } = response.data;
        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", localId);
        dispatch(authSuccess(idToken, localId));
        dispatch(checkAuthTimeout(expiresIn * 1000));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => ({
  type: ActionTypes.SET_AUTH_REDIRECT,
  path
});

export const authCheckState = () => {
  return dispatch => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      dispatch(authLogout());
    } else {
      const userId = new Date(localStorage.getItem("userId"));
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        const expiresIn =
          (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(authSuccess(idToken, userId));
        dispatch(checkAuthTimeout(expiresIn));
      } else {
        dispatch(authLogout());
      }
    }
  };
};
