// Libraries
import { combineReducers } from "redux";
// Reducers
import burgerBuilderReducer from "./burger-builder-reducer";
import orderReducer from "./order-reducer";
import authReducer from "./auth-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  burger: burgerBuilderReducer,
  order: orderReducer
});

export default rootReducer;
