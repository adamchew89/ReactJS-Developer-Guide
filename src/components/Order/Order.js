// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Order.module.css";

const Order = props => {
  const { totalPrice, ingredients } = props;
  const ings = [];
  Object.keys(ingredients).map(ing =>
    ings.push({ name: ing, amount: ingredients[ing] })
  );
  const ingsOutput = ings.map(ing => (
    <span key={ing.name} className={classes.Ingredient}>
      {ing.name} ({ing.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingsOutput}</p>
      <p>
        Price: <strong>SGD {totalPrice.toFixed(2)}</strong>
      </p>
    </div>
  );
};

Order.propTypes = {
  totalPrice: PropTypes.number,
  ingredients: PropTypes.object
};

Order.defaultProps = {
  totalPrice: 0,
  ingredients: {}
};

export default Order;
