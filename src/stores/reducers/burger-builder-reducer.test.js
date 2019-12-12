// Reducers
import reducer, {
  initialState,
  INGREDIENT_PRICES
} from "./burger-builder-reducer";
// ActionCreators
import * as ActionTypes from "../actions/action-types";
// Components
import {
  SALAD,
  BACON,
  CHEESE,
  MEAT
} from "../../components/Burger/BurgerIngredient/BurgerIngredient";

describe("BurgerBuilderReducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should add attribute MEAT with quantity of 1 to ingredients and update price", () => {
    expect(
      reducer(undefined, {
        type: ActionTypes.ADD_INGREDIENT,
        ingredientName: MEAT
      })
    ).toEqual({
      ...initialState,
      building: true,
      ingredients: { ...initialState.ingredients, [MEAT]: 1 },
      totalPrice: initialState.totalPrice + INGREDIENT_PRICES[MEAT]
    });
  });

});
