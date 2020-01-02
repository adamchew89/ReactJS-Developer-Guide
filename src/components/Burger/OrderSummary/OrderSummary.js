// Libraries
import React, { Fragment } from "react";
import PropTypes from "prop-types";
// Components
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
  const { ingredients, price, purchaseCancelled, purchaseContinued } = props;
  const ingredientSummary = Object.keys(ingredients).map(igKey => (
    <li key={igKey}>
      <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
      {ingredients[igKey]}
    </li>
  ));
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: SGD {price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button clicked={purchaseCancelled} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={purchaseContinued} btnType="Success">
        CONTINUE
      </Button>
    </Fragment>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  purchaseCancelled: PropTypes.func.isRequired,
  purchaseContinued: PropTypes.func.isRequired,
  price: PropTypes.number
};

OrderSummary.defaultProps = {
  price: 0.0
};

export default OrderSummary;
