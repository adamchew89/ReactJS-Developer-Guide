// Actions
import * as ActionTypes from "../actions/action-types";
// Utils
import { updateObject } from "../../shared/utils/utils";
// Components
import {
  SALAD,
  BACON,
  CHEESE,
  MEAT
} from "../../components/Burger/BurgerIngredient/BurgerIngredient";

// Ingredient price map
export const INGREDIENT_PRICES = {
  [SALAD]: 0.5,
  [BACON]: 1.0,
  [CHEESE]: 0.7,
  [MEAT]: 1.3
};

// Initial state
export const initialState = {
  ingredients: { [SALAD]: 0, [BACON]: 0, [CHEESE]: 0, [MEAT]: 0 },
  totalPrice: 4,
  error: false,
  building: false
};

const ingredientsReducer = (state = initialState, action) => {
  let updatedIngredient, updatedIngredients, updatedState;
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      };
      updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      };
      return updateObject(state, updatedState);
    case ActionTypes.REMOVE_INGREDIENT:
      updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
      };
      updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      };
      return updateObject(state, updatedState);
    case ActionTypes.SET_INGREDIENT:
      return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        building: false
      });
    case ActionTypes.FETCH_INGREDIENTS_FAIL:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default ingredientsReducer;
