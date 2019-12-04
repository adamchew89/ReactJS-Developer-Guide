// Libraries
import { combineReducers } from "redux";
// Reducers
import burgerBuilderReducer from "./burger-builder-reducer";
import orderReducer from "./order-reducer";

const rootReducer = combineReducers({
  burger: burgerBuilderReducer,
  order: orderReducer
});

export default rootReducer;