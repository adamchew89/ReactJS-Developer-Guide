// Actions
import axios from "../../actions/axios-orders";
// Stores
import * as ActionTypes from "./action-types";

export const purchaseBurgerInit = () => ({
  type: ActionTypes.PURCHASE_BURGER_INIT
});

export const purchaseBurgerStart = () => ({
  type: ActionTypes.PURCHASE_BURGER_START
});

export const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: ActionTypes.PURCHASE_BURGER_SUCCESS,
  orderId,
  orderData
});

export const purchaseBurgerFail = error => ({
  type: ActionTypes.PURCHASE_BURGER_FAIL,
  error
});

export const purchaseBurger = (orderData, idToken) => async dispatch => {
  // Start loading
  dispatch(purchaseBurgerStart());
  return axios
    .post(`/orders.json?auth=${idToken}`, orderData)
    .then(response =>
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    )
    .catch(error => dispatch(purchaseBurgerFail(error)));
};

export const fetchOrdersStart = () => ({
  type: ActionTypes.FETCH_ORDERS_START
});

export const fetchOrdersSuccess = orders => ({
  type: ActionTypes.FETCH_ORDERS_SUCCESS,
  orders
});

export const fetchOrdersFail = error => ({
  type: ActionTypes.FETCH_ORDERS_FAIL,
  error
});

export const fetchOrders = (idToken, userId) => async dispatch => {
  dispatch(fetchOrdersStart());
  const queryParams = `auth=${idToken}&orderBy="userId"&equalTo="${userId}"`;
  return axios
    .get(`/orders.json?${queryParams}`)
    .then(response => {
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({ ...response.data[key], id: key });
      }
      return dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(error => dispatch(fetchOrdersFail(error)));
};
