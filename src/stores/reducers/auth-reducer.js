// ActionTypes
import * as ActionTypes from "../actions/action-types";
// Utils
import { updateObject } from "../utils/utils";

const initialState = { idToken: null, userId: null, error: null, loading: false };

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
    default:
      return state;
  }
};

export default authReducer;
