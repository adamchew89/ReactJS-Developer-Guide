// Stores
import * as ActionTypes from "../actions/action-types";
// Utils
import { updateObject } from "../../shared/utils/utils";

export const initialState = {
  orders: [],
  purchased: false,
  loading: false
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PURCHASE_BURGER_INIT:
      return updateObject(state, { purchased: false });
    case ActionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });
    case ActionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(action.orderData, {
        orderId: action.orderId
      });
      return updateObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      });
    case ActionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });
    case ActionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    case ActionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, { loading: false, orders: action.orders });
    case ActionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });
    default:
      return state;
  }
};

export default orderReducer;
