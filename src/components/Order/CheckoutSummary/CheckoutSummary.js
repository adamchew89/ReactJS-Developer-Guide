// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./CheckoutSummary.module.css";
// Components
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

const CheckoutSummary = props => {
  const { ingredients, checkoutCancelled, checkoutContinued } = props;
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <Burger ingredients={ingredients} />
      <Button btnType="Danger" clicked={checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  checkoutCancelled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired
};

CheckoutSummary.defaultProps = {};

export default CheckoutSummary;
