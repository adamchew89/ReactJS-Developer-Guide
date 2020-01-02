// Reducers
import reducer, {
  initialState,
  INGREDIENT_PRICES
} from "./burger-builder-reducer";
// ActionCreators
import * as ActionTypes from "../actions/action-types";
// Components
import * as Ingredients from "../../components/Burger/BurgerIngredient/BurgerIngredient";

describe("BurgerBuilderReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should add attribute MEAT with quantity of 1 to ingredients and update price", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.ADD_INGREDIENT,
        ingredientName: Ingredients.MEAT
      })
    ).toEqual({
      ...initialState,
      building: true,
      ingredients: { ...initialState.ingredients, [Ingredients.MEAT]: 1 },
      totalPrice: initialState.totalPrice + INGREDIENT_PRICES[Ingredients.MEAT]
    });
  });

  it("should remove attribute MEAT with quantity of 1 to ingredients and update price", () => {
    const configuredState = {
      ...initialState,
      ingredients: { ...initialState.ingredients, [Ingredients.MEAT]: 4 }
    };
    expect(
      reducer(configuredState, {
        type: ActionTypes.REMOVE_INGREDIENT,
        ingredientName: Ingredients.MEAT
      })
    ).toEqual({
      ...configuredState,
      building: true,
      ingredients: { ...configuredState.ingredients, [Ingredients.MEAT]: 3 },
      totalPrice: initialState.totalPrice - INGREDIENT_PRICES[Ingredients.MEAT]
    });
  });

  it("should set 'ingredients' and default 'totalPrice' to 4.", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.SET_INGREDIENT,
        ingredients: { [Ingredients.MEAT]: 1 }
      })
    ).toEqual({
      ...initialState,
      building: false,
      ingredients: { [Ingredients.MEAT]: 1 },
      totalPrice: 4
    });
  });

  it("should set 'error' to true.", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.FETCH_INGREDIENTS_FAIL
      })
    ).toEqual({
      ...initialState,
      error: true
    });
  });
});
