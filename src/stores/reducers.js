// Actions
import * as ActionsType from "./actions";
// Components
import {
  SALAD,
  BACON,
  CHEESE,
  MEAT
} from "../components/Burger/BurgerIngredient/BurgerIngredient";

// Ingredient price map
export const INGREDIENT_PRICES = {
  [SALAD]: 0.5,
  [BACON]: 1.0,
  [CHEESE]: 0.7,
  [MEAT]: 1.3
};

// Initial state
const initialState = {
  ingredients: { [SALAD]: 1, [BACON]: 1, [CHEESE]: 1, [MEAT]: 1 },
  totalPrice: 4
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsType.ADD_INGREDIENT:
      // Deep cloning with nested spread operator
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case ActionsType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    default:
      return state;
  }
};

export default ingredientsReducer;
