// Actions
import axios from "../../actions/axios-orders";
// Stores
import * as ActionTypes from "./action-types";

export const purchaseBurgerInit = () => {
  return {
    type: ActionTypes.PURCHASE_BURGER_INIT
  };
};

export const purchaseBurgerStart = () => {
  return { type: ActionTypes.PURCHASE_BURGER_START };
};

export const purchaseBurgerSuccess = (orderId, orderData) => {
  return {
    type: ActionTypes.PURCHASE_BURGER_SUCCESS,
    orderId,
    orderData
  };
};

export const purchaseBurgerFail = error => {
  return { type: ActionTypes.PURCHASE_BURGER_FAIL, error };
};

export const purchaseBurger = (orderData, idToken) => {
  return dispatch => {
    // Start loading
    dispatch(purchaseBurgerStart());
    axios
      .post(`/orders.json?auth=${idToken}`, orderData)
      .then(response => {
        // Signal success burger purchase
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        // Signal failed burger purchase
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const fetchOrdersStart = () => {
  return {
    type: ActionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: ActionTypes.FETCH_ORDERS_SUCCESS,
    orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: ActionTypes.FETCH_ORDERS_FAIL,
    error
  };
};

export const fetchOrders = (idToken, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = `auth=${idToken}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get(`/orders.json?${queryParams}`)
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
