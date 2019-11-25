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

const controls = [
  {
    label: "Meat",
    type: MEAT
  },
  {
    label: "Cheese",
    type: CHEESE
  },
  {
    label: "Salad",
    type: SALAD
  },
  {
    label: "Bacon",
    type: BACON
  }
];

const BuildControls = props => {
  const {
    disabled,
    purchaseable,
    addIngredient,
    removeIngredient,
    currentPrice,
    ordered
  } = props;
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>SGD {currentPrice.toFixed(2)}</strong>
      </p>
      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          disabled={disabled[control.type]}
          added={() => addIngredient(control.type)}
          removed={() => removeIngredient(control.type)}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!purchaseable}
        onClick={ordered}
      >
        ORDER NOW!
      </button>
    </div>
  );
};

BuildControls.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  ordered: PropTypes.func.isRequired,
  purchaseable: PropTypes.bool,
  disabled: PropTypes.bool,
  currentPrice: PropTypes.number
};

BuildControls.defaultProps = {
  purchaseable: false,
  disabled: true,
  currentPrice: 0.0
};

export default BuildControls;
