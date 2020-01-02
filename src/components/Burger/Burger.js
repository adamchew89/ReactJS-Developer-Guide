// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Burger.module.css";
// Components
import BurgerIngredient, {
  BREAD_TOP,
  BREAD_BOTTOM
} from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  const { ingredients } = props;
  let transformedIngredients = Object.keys(ingredients)
    .map(igKey =>
      [...Array(ingredients[igKey])].map((_, index) => (
        <BurgerIngredient key={`${igKey}${index}`} type={igKey} />
      ))
    )
    .reduce((arr, el) => arr.concat(el), []);
  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={BREAD_TOP} />
      {transformedIngredients}
      <BurgerIngredient type={BREAD_BOTTOM} />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.object
};

Burger.defaultProps = { ingredients: {} };

export default Burger;
