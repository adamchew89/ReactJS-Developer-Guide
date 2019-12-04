// Libraries
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// Components
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
// Containers
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  checkoutContinuedHandler = () => {
    const { history } = this.props;
    history.replace("/checkout/contact-data");
  };

  render() {
    const { match, ingredients, purchased } = this.props;
    let summary = <Redirect to="/" />;
    if (ingredients) {
      summary = purchased ? (
        <Redirect to="/" />
      ) : (
        <>
          <CheckoutSummary
            ingredients={ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route path={`${match.path}/contact-data`} component={ContactData} />
        </>
      );
    }
    return <div>{summary}</div>;
  }
}

Checkout.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

Checkout.defaultProps = {};

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
