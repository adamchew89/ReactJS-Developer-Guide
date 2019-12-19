// Libraries
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
// Actions
import axios from "../../actions/axios-orders";
// Reducers
import * as action from "./burger-builder-action";
// ActionCreators
import * as ActionTypes from "../actions/action-types";
// Components
import * as Ingredients from "../../components/Burger/BurgerIngredient/BurgerIngredient";
// Setup
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("BurgerBuilderActionCreators - sync", () => {
  it("should return ADD_INGREDIENT.", () => {
    expect(action.addIngredient(Ingredients.BACON)).toEqual({
      type: ActionTypes.ADD_INGREDIENT,
      ingredientName: Ingredients.BACON
    });
  });

  it("should return REMOVE_INGREDIENT.", () => {
    expect(action.removeIngredient(Ingredients.BACON)).toEqual({
      type: ActionTypes.REMOVE_INGREDIENT,
      ingredientName: Ingredients.BACON
    });
  });

  it("should return SET_INGREDIENT.", () => {
    expect(action.setIngredients({ [Ingredients.BACON]: 1 })).toEqual({
      type: ActionTypes.SET_INGREDIENT,
      ingredients: { [Ingredients.BACON]: 1 }
    });
  });

  it("should return FETCH_INGREDIENTS_FAIL.", () => {
    expect(action.fetchIngredientsFail()).toEqual({
      type: ActionTypes.FETCH_INGREDIENTS_FAIL
    });
  });
});

let mock;
let store;

describe("BurgerBuilderActionCreators - async", () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({});
  });

  it("should return SET_INGREDIENT when initIngredients has been done", done => {
    expect.assertions(1);
    mock.onGet("/ingredients.json").replyOnce(200, {
      [Ingredients.BACON]: 1
    });
    store.dispatch(action.initIngredients()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: ActionTypes.SET_INGREDIENT,
        ingredients: { [Ingredients.BACON]: 1 }
      });
      done();
    });
  });

  it("should return FETCH_INGREDIENTS_FAIL when initIngredients fails", done => {
    expect.assertions(1);
    mock.onGet("/ingredients.json").networkErrorOnce();
    store
      .dispatch(action.initIngredients())
      .then(response => {
        expect(response).toEqual({
          type: ActionTypes.FETCH_INGREDIENTS_FAIL
        });
        done();
      })
  });
});
