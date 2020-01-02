// Reducers
import reducer, { initialState } from "./auth-reducer";
// ActionCreators
import * as ActionTypes from "../actions/action-types";

describe("AuthReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should reset error and trigger loading and triggered", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.AUTH_START
      })
    ).toEqual({ ...initialState, error: null, loading: true });
  });

  it("should store the token, userId upon loggin in", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.AUTH_SUCCESS,
        idToken: "test",
        userId: "testuser"
      })
    ).toEqual({ ...initialState, userId: "testuser", idToken: "test" });
  });

  it("should remove the token, userId upon loggin out", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.AUTH_LOGOUT
      })
    ).toEqual({ ...initialState, idToken: null, loading: false });
  });

  it("should store the error upon loggin fail", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.AUTH_FAIL,
        error: "error"
      })
    ).toEqual({ ...initialState, error: "error" });
  });

  it("should store the authRedirectPath when triggered", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.SET_AUTH_REDIRECT,
        path: "/test"
      })
    ).toEqual({ ...initialState, authRedirectPath: "/test" });
  });
});
