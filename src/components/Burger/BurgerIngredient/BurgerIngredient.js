// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./BurgerIngredient.module.css";

export const BREAD_BOTTOM = "BREAD_BOTTOM";
export const BREAD_TOP = "BREAD_TOP";
export const MEAT = "MEAT";
export const CHEESE = "CHEESE";
export const BACON = "BACON";
export const SALAD = "SALAD";

const BurgerIngredient = props => {
  let ingredient = null;
  switch (props.type) {
    case BREAD_BOTTOM:
      ingredient = <div className={classes.BreadBottom}> </div>;
      break;
    case BREAD_TOP:
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}> </div>
          <div className={classes.Seeds2}> </div>
        </div>
      );
      break;
    case MEAT:
      ingredient = <div className={classes.Meat}></div>;
      break;
    case CHEESE:
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case BACON:
      ingredient = <div className={classes.Bacon}></div>;
      break;
    case SALAD:
      ingredient = <div className={classes.Salad}></div>;
      break;
    default:
      break;
  }
  return ingredient;
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

BurgerIngredient.defaultProps = {};

export default BurgerIngredient;
