// Actions
import axios from "../../actions/axios-orders";
// Stores
import * as ActionTypes from "./action-types";

export const addIngredient = ingredientName => ({
  type: ActionTypes.ADD_INGREDIENT,
  ingredientName
});

export const removeIngredient = ingredientName => ({
  type: ActionTypes.REMOVE_INGREDIENT,
  ingredientName
});

export const initIngredients = () => dispatch =>
  axios
    .get("/ingredients.json")
    .then(response => dispatch(setIngredients(response.data)))
    .catch(() => dispatch(fetchIngredientsFail()));

export const setIngredients = ingredients => ({
  type: ActionTypes.SET_INGREDIENT,
  ingredients
});

export const fetchIngredientsFail = () => ({
  type: ActionTypes.FETCH_INGREDIENTS_FAIL
});
