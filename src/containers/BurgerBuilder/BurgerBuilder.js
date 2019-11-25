// Libraries
import React, { Component, Fragment } from "react";
// Components
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import {
  MEAT,
  CHEESE,
  SALAD,
  BACON
} from "../../components/Burger/BurgerIngredient/BurgerIngredient";

export const INGREDIENT_PRICES = {
  [SALAD]: 0.5,
  [BACON]: 1.0,
  [CHEESE]: 0.7,
  [MEAT]: 1.3
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        [SALAD]: 0,
        [BACON]: 0,
        [CHEESE]: 0,
        [MEAT]: 0
      },
      totalPrice: 4,
      purchaseable: false,
      purchasing: false
    };
  }

  updatePurchaseState() {
    const { ingredients: ings } = this.state;
    // Initialize a copy of ingredients
    const ingredients = {
      ...ings
    };
    // Get sum total of all ingredients and cost
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = type => {
    const { ingredients, totalPrice } = this.state;
    // Update ingredients
    const updatedIngredients = {
      ...ingredients,
      [type]: ingredients[type] + 1
    };
    // Update state for ingredients and total
    this.setState(
      {
        totalPrice: totalPrice + INGREDIENT_PRICES[type],
        ingredients: updatedIngredients
      },
      () => this.updatePurchaseState()
    );
  };

  removeIngredientHandler = type => {
    const { ingredients, totalPrice } = this.state;
    // Checks if the ingredient type count is already zero
    const checker = ingredients[type];
    // Update ingredients
    const updatedIngredients = {
      ...ingredients,
      // Remove ingredient count only if more than one
      [type]: checker ? ingredients[type] - 1 : 0
    };
    // Update state for ingredients and total
    this.setState(
      {
        totalPrice: checker ? totalPrice - INGREDIENT_PRICES[type] : totalPrice,
        ingredients: updatedIngredients
      },
      () => this.updatePurchaseState()
    );
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("You've continued~!");
  };

  render() {
    const { ingredients, totalPrice, purchaseable } = this.state;
    const disabledInfo = { ...ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          purchaseable={purchaseable}
          currentPrice={totalPrice}
          disabled={disabledInfo}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          ordered={this.purchaseHandler}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
