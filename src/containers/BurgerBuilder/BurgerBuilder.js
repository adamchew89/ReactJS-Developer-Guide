// Libraries
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Actions
import axios from "../../actions/axios-orders";
// Stores
import * as BurgerBuilderActionCreator from "../../stores/actions/burger-builder-action";
import * as OrderActionCreator from "../../stores/actions/order-actions";
import * as AuthActionCreator from "../../stores/actions/auth-action";
// HOCs
import withErrorHandler from "../../hocs/withErrorHandler/withErrorHandler";
// Components
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

export class BurgerBuilder extends Component {
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
    const { isAuthenticated, history, onSetAuthRedirectPath } = this.props;
    if (isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      onSetAuthRedirectPath("/checkout");
      history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const { history } = this.props;
    history.push("/checkout");
  };

  render() {
    const { loading } = this.state;
    const {
      onIngredientAdded,
      onIngredientRemoved,
      ingredients,
      totalPrice,
      error,
      isAuthenticated
    } = this.props;
    const disabledInfo = { ...ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients cannot be loaded!</p> : <Spinner />;
    if (Object.keys(ingredients).length !== 0) {
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
            isAuth={isAuthenticated}
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

BurgerBuilder.propTypes = {
  initIngredients: PropTypes.func.isRequired,
  purchaseBurgerInit: PropTypes.func.isRequired,
  onIngredientAdded: PropTypes.func.isRequired,
  onIngredientRemoved: PropTypes.func.isRequired,
  ingredients: PropTypes.object.isRequired,
  totalPrice: PropTypes.number.isRequired,
  error: PropTypes.bool,
  isAuthenticated: PropTypes.bool
};

BurgerBuilder.defaultProps = { error: false, isAuthenticated: false };

const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  error: state.burger.error,
  isAuthenticated: state.auth.idToken !== null
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingredientName =>
    dispatch(BurgerBuilderActionCreator.addIngredient(ingredientName)),
  onIngredientRemoved: ingredientName =>
    dispatch(BurgerBuilderActionCreator.removeIngredient(ingredientName)),
  initIngredients: () => dispatch(BurgerBuilderActionCreator.initIngredients()),
  purchaseBurgerInit: () => dispatch(OrderActionCreator.purchaseBurgerInit()),
  onSetAuthRedirectPath: path =>
    dispatch(AuthActionCreator.setAuthRedirectPath(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
