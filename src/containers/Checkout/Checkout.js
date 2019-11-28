// Libraries
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
// Components
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
// Containers
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    totalPrice: 0,
    ingredients: {}
  };

  componentDidMount() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        totalPrice = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients, totalPrice });
  }

  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  checkoutContinuedHandler = () => {
    const { history } = this.props;
    history.replace("/checkout/contact-data");
  };

  render() {
    const { totalPrice, ingredients } = this.state;
    const { match } = this.props;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${match.path}/contact-data`}
          render={props => (
            <ContactData
              ingredients={ingredients}
              totalPrice={totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

Checkout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

Checkout.defaultProps = {};

export default Checkout;
