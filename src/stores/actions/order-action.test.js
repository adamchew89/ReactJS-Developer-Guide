// Libraries
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
// Actions
import axios from "../../actions/axios-orders";
// Reducers
import * as action from "./order-action";
// ActionCreators
import * as ActionTypes from "../actions/action-types";
// Setup
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("OrderActionCreators - sync", () => {
  it("should return PURCHASE_BURGER_INIT.", () => {
    expect(action.purchaseBurgerInit()).toEqual({
      type: ActionTypes.PURCHASE_BURGER_INIT
    });
  });

  it("should return PURCHASE_BURGER_START .", () => {
    expect(action.purchaseBurgerStart()).toEqual({
      type: ActionTypes.PURCHASE_BURGER_START
    });
  });

  it("should return PURCHASE_BURGER_FAIL .", () => {
    expect(action.purchaseBurgerFail("ERROR")).toEqual({
      type: ActionTypes.PURCHASE_BURGER_FAIL,
      error: "ERROR"
    });
  });

  it("should return PURCHASE_BURGER_SUCCESS .", () => {
    expect(action.purchaseBurgerSuccess("orderId", "orderData")).toEqual({
      type: ActionTypes.PURCHASE_BURGER_SUCCESS,
      orderId: "orderId",
      orderData: "orderData"
    });
  });

  it("should return FETCH_ORDERS_START .", () => {
    expect(action.fetchOrdersStart()).toEqual({
      type: ActionTypes.FETCH_ORDERS_START
    });
  });

  it("should return FETCH_ORDERS_SUCCESS .", () => {
    expect(action.fetchOrdersSuccess("TEST")).toEqual({
      type: ActionTypes.FETCH_ORDERS_SUCCESS,
      orders: "TEST"
    });
  });

  it("should return FETCH_ORDERS_FAIL .", () => {
    expect(action.fetchOrdersFail("ERROR")).toEqual({
      type: ActionTypes.FETCH_ORDERS_FAIL,
      error: "ERROR"
    });
  });
});

let mock;
let store;
const idToken = "testIdToken";
const userId = "testUserId";

describe("OrderActionCreators - async", () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({});
  });

  it("should return PURCHASE_BURGER_START and PURCHASE_BURGER_SUCCESS when purchaseBurger has been done.", done => {
    const orderData = "testOrderData";
    const orderId = "testOrderId";
    expect.assertions(2);
    mock.onPost(`/orders.json?auth=${idToken}`).replyOnce(200, {
      name: orderId
    });
    store.dispatch(action.purchaseBurger(orderData, idToken)).then(response => {
      expect(store.getActions()[0]).toEqual({
        type: ActionTypes.PURCHASE_BURGER_START
      });
      expect(response).toEqual({
        type: ActionTypes.PURCHASE_BURGER_SUCCESS,
        orderId,
        orderData
      });
      done();
    });
  });

  it("should return PURCHASE_BURGER_START and PURCHASE_BURGER_FAIL when purchaseBurger fails.", done => {
    expect.assertions(2);
    mock.onPost(`/orders.json?auth=${idToken}`).replyOnce(500);
    store.dispatch(action.purchaseBurger()).then(response => {
      expect(store.getActions()[0]).toEqual({
        type: ActionTypes.PURCHASE_BURGER_START
      });
      expect(response.type).toEqual(ActionTypes.PURCHASE_BURGER_FAIL);
      done();
    });
  });

  it("should return FETCH_ORDERS_START and FETCH_ORDERS_SUCCESS when fetchOrders has been done.", done => {
    expect.assertions(2);
    mock
      .onGet(
        `/orders.json?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`
      )
      .replyOnce(200, { test: { attr: "test" } });
    store.dispatch(action.fetchOrders(idToken, userId)).then(response => {
      expect(store.getActions()[0]).toEqual({
        type: ActionTypes.FETCH_ORDERS_START
      });
      expect(response).toEqual({
        type: ActionTypes.FETCH_ORDERS_SUCCESS,
        orders: [{ id: "test", attr: "test" }]
      });
      done();
    });
  });

  it("should return FETCH_ORDERS_START and FETCH_ORDERS_FAIL when fetchOrders fails.", done => {
    expect.assertions(2);
    mock
      .onGet(
        `/orders.json?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`
      )
      .replyOnce(500);
    store.dispatch(action.fetchOrders(idToken, userId)).then(response => {
      expect(store.getActions()[0]).toEqual({
        type: ActionTypes.FETCH_ORDERS_START
      });
      expect(response.type).toEqual(ActionTypes.FETCH_ORDERS_FAIL);
      done();
    });
  });
});
