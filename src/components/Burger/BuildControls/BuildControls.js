// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./BuildControls.module.css";
// Components
import BuildControl from "./BuildControl/BuildControl";
import {
  MEAT,
  CHEESE,
  SALAD,
  BACON
} from "../BurgerIngredient/BurgerIngredient";

const controls = [MEAT, CHEESE, SALAD, BACON];

const BuildControls = props => {
  const {
    disabled,
    purchaseable,
    addIngredient,
    removeIngredient,
    currentPrice,
    ordered,
    isAuth
  } = props;
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>SGD {currentPrice.toFixed(2)}</strong>
      </p>
      {controls.map(control => (
        <BuildControl
          key={control}
          label={`${control.charAt(0).toUpperCase()}${control
            .slice(1)
            .toLowerCase()}`}
          disabled={disabled[control]}
          added={() => addIngredient(control)}
          removed={() => removeIngredient(control)}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!purchaseable}
        onClick={ordered}
      >
        {isAuth ? "ORDER NOW!" : "SIGN IN!"}
      </button>
    </div>
  );
};

BuildControls.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  ordered: PropTypes.func.isRequired,
  purchaseable: PropTypes.bool,
  disabled: PropTypes.object,
  currentPrice: PropTypes.number,
  isAuth: PropTypes.bool
};

BuildControls.defaultProps = {
  purchaseable: false,
  disabled: {},
  currentPrice: 0.0,
  isAuth: false
};

export default BuildControls;
