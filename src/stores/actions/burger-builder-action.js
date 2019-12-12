// Actions
import axios from "../../actions/axios-orders";
// Stores
import * as ActionTypes from "./action-types";

export const addIngredient = ingredientName => {
  return { type: ActionTypes.ADD_INGREDIENT, ingredientName };
};

export const removeIngredient = ingredientName => {
  return { type: ActionTypes.REMOVE_INGREDIENT, ingredientName };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients.json")
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFail());
      });
  };
};

export const setIngredients = ingredients => {
  return { type: ActionTypes.SET_INGREDIENT, ingredients };
};

export const fetchIngredientsFail = () => {
  return { type: ActionTypes.FETCH_INGREDIENTS_FAIL };
};
