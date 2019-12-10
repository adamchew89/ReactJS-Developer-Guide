// Libraries
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// Actions
import axios from "../../actions/axios-orders";
// Stores
import * as BurgerBuilderActionCreator from "../../stores/actions/burger-builder-action";
import * as OrderActionCreator from "../../stores/actions/order-actions";
// HOCs
import withErrorHandler from "../../hocs/withErrorHandler/withErrorHandler";
// Components
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    const { initIngredients, purchaseBurgerInit } = this.props;
    initIngredients();
    purchaseBurgerInit();
  }

  updatePurchaseState(ingredients) {
    // Get sum total of all ingredients and cost
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const { loading } = this.state;
    const {
      onIngredientAdded,
      onIngredientRemoved,
      ingredients,
      totalPrice,
      error
    } = this.props;
    const disabledInfo = { ...ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;
    if (ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={ingredients} />
          <BuildControls
            purchaseable={this.updatePurchaseState(ingredients)}
            currentPrice={totalPrice}
            disabled={disabledInfo}
            addIngredient={onIngredientAdded}
            removeIngredient={onIngredientRemoved}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

BurgerBuilder.propTypes = {};

BurgerBuilder.defaultProps = {};

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch(BurgerBuilderActionCreator.addIngredient(ingredientName)),
    onIngredientRemoved: ingredientName =>
      dispatch(BurgerBuilderActionCreator.removeIngredient(ingredientName)),
    initIngredients: () =>
      dispatch(BurgerBuilderActionCreator.initIngredients()),
      purchaseBurgerInit: () => dispatch(OrderActionCreator.purchaseBurgerInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
