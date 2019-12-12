// ActionTypes
import * as ActionTypes from "../actions/action-types";
// Utils
import { updateObject } from "../../shared/utils/utils";

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case ActionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
      });
    case ActionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case ActionTypes.AUTH_LOGOUT:
      return updateObject(state, { idToken: null, loading: false });
    case ActionTypes.SET_AUTH_REDIRECT:
      return updateObject(state, { authRedirectPath: action.path });
    default:
      return state;
  }
};

export default authReducer;
