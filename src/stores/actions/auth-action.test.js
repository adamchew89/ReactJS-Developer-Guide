// Libraries
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
// Reducers
import * as action from "./auth-action";
// ActionCreators
import * as ActionTypes from "../actions/action-types";
// Setup
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("AuthActionCreators - sync", () => {
  it("should return AUTH_START.", () => {
    expect(action.authStart()).toEqual({ type: ActionTypes.AUTH_START });
  });

  it("should return AUTH_SUCCESS.", () => {
    expect(action.authSuccess("test", "test2")).toEqual({
      type: ActionTypes.AUTH_SUCCESS,
      idToken: "test",
      userId: "test2"
    });
  });

  it("should return AUTH_LOGOUT.", () => {
    expect(action.authLogout()).toEqual({
      type: ActionTypes.AUTH_LOGOUT
    });
  });

  it("should return AUTH_FAIL.", () => {
    expect(action.authFail("test")).toEqual({
      type: ActionTypes.AUTH_FAIL,
      error: "test"
    });
  });

  it("should return SET_AUTH_REDIRECT.", () => {
    expect(action.setAuthRedirectPath("test")).toEqual({
      type: ActionTypes.SET_AUTH_REDIRECT,
      path: "test"
    });
  });
});

let mock;
let store;
const url = "https://identitytoolkit.googleapis.com/v1/accounts";
const apiKey = "AIzaSyDORn001mDlaIpoXf8n3Jh2MqFPzXlMPmk";
const email = "testEmail";
const password = "testPassword";
const idToken = "testIdToken";
const localId = "testLocalId";

describe("AuthActionCreators - async", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(Storage.prototype, "getItem");
    mock = new MockAdapter(axios);
    store = mockStore({});
  });

  afterEach(() => {
    jest.runAllTimers();
    localStorage.clear();
    localStorage.getItem.mockRestore();
  });

  it("should trigger setTimeout with a function when checkAuthTimeout has been done. ", () => {
    store.dispatch(action.checkAuthTimeout(1000));
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it("should return AUTH_START and AUTH_SUCCESS when auth has been done.", done => {
    expect.assertions(2);
    mock.onPost(`${url}:signUp?key=${apiKey}`).replyOnce(200, {
      idToken,
      localId
    });
    store.dispatch(action.auth(email, password, true)).then(response => {
      expect(store.getActions()[0]).toEqual({
        type: ActionTypes.AUTH_START
      });
      expect(response).toEqual({
        type: ActionTypes.AUTH_SUCCESS,
        idToken,
        userId: localId
      });
      done();
    });
  });

  it("should return AUTH_START and AUTH_FAIL when auth has been done.", done => {
    expect.assertions(2);
    mock
      .onPost(`${url}:signInWithPassword?key=${apiKey}`)
      .replyOnce(500, { response: { data: { error: "error" } } });
    store.dispatch(action.auth(email, password, false)).then(response => {
      expect(store.getActions()[0]).toEqual({
        type: ActionTypes.AUTH_START
      });
      expect(response.type).toEqual(ActionTypes.AUTH_FAIL);
      done();
    });
  });

  it("should return AUTH_LOGOUT when authCheckState has been done without idToken.", done => {
    expect.assertions(2);
    const response = store.dispatch(action.authCheckState());
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ type: ActionTypes.AUTH_LOGOUT });
    done();
  });

  it("should return AUTH_LOGOUT when authCheckState has been done with expirationDate < now().", done => {
    const expirationDate = new Date(1000);
    expect.assertions(2);
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("userId", localId);
    localStorage.setItem("expirationDate", expirationDate);
    const response = store.dispatch(action.authCheckState());
    expect(localStorage.getItem).toHaveBeenCalledTimes(3);
    expect(response).toEqual({ type: ActionTypes.AUTH_LOGOUT });
    done();
  });

  it("should return AUTH_SUCCESS when authCheckState has been done with expirationDate > now().", done => {
    const expirationDate = new Date(new Date().getTime() + 1000);
    expect.assertions(2);
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("userId", localId);
    localStorage.setItem("expirationDate", expirationDate);
    const response = store.dispatch(action.authCheckState());
    expect(localStorage.getItem).toHaveBeenCalledTimes(3);
    expect(response).toEqual({
      type: ActionTypes.AUTH_SUCCESS,
      idToken,
      userId: localId
    });
    done();
  });
});
