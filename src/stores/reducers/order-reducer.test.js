// Reducers
import reducer, { initialState } from "./order-reducer";
// ActionCreators
import * as ActionTypes from "../actions/action-types";

describe("OrderReducer", () => {
  it("should return the initial state.", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should set 'purchased' to false.", () => {
    expect(
      reducer(
        { ...initialState, purchased: true },
        { type: ActionTypes.PURCHASE_BURGER_INIT }
      )
    ).toEqual({ ...initialState, purchased: false });
  });

  it("should set 'loading' to true.", () => {
    expect(
      reducer(undefined, { type: ActionTypes.PURCHASE_BURGER_START })
    ).toEqual({ ...initialState, loading: true });
    expect(
      reducer(undefined, { type: ActionTypes.FETCH_ORDERS_START })
    ).toEqual({ ...initialState, loading: true });
  });

  it("should push into 'orders' with new Order.", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: "test",
        orderData: { test: "testtest" }
      })
    ).toEqual({
      ...initialState,
      purchased: true,
      orders: [{ orderId: "test", test: "testtest" }]
    });
  });

  it("should set 'loading' to false.", () => {
    expect(
      reducer(
        { ...initialState, loading: true },
        { type: ActionTypes.PURCHASE_BURGER_FAIL }
      )
    ).toEqual({ ...initialState, loading: false });
    expect(
      reducer(
        { ...initialState, loading: true },
        { type: ActionTypes.FETCH_ORDERS_FAIL }
      )
    ).toEqual({ ...initialState, loading: false });
  });

  it("should set 'orders' to array with mock order.", () => {
    expect(
      reducer(
        { ...initialState, loading: true },
        { type: ActionTypes.FETCH_ORDERS_SUCCESS, orders: [{ test: "test" }] }
      )
    ).toEqual({ ...initialState, loading: false, orders: [{ test: "test" }] });
  });
});
