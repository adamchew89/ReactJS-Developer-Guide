// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import thunk from "redux-thunk";
// Containers
import { BurgerBuilder } from "./BurgerBuilder";
// Components
import Spinner from "../../components/UI/Spinner/Spinner";
import * as Ingredients from "../../components/Burger/BurgerIngredient/BurgerIngredient";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe("<BurgerBuilder />", () => {
  const initialProps = {
    initIngredients: () => {},
    purchaseBurgerInit: () => {},
    onIngredientAdded: ingName => ingName,
    onIngredientRemoved: ingName => ingName,
    ingredients: {},
    totalPrice: 0
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder {...initialProps} />, {
      context: { store: mockStore() }
    });
  });

  afterEach(() => {
    wrapper = null;
  });

  it("should not render <p>Ingredients cannot be loaded!</p> when error exists", () => {
    wrapper.setProps({ error: true });
    expect(wrapper.find("p")).toHaveLength(1);
  });

  it("should render <BuildControls /> and <OrderSummary /> when receiving ingredients", () => {
    wrapper.setProps({ ingredients: { [Ingredients.SALAD]: 0 } });
    wrapper.setState({ loading: false });
    expect(wrapper.find(Spinner)).toHaveLength(0);
    expect(wrapper.find(BuildControls)).toHaveLength(1);
    expect(wrapper.find(OrderSummary)).toHaveLength(1);
  });

  it("should render two <Spinner /> if loading is true and <BuildControls /> and <OrderSummary /> should not render.", () => {
    wrapper.setState({ loading: true });
    expect(wrapper.find(Spinner)).toHaveLength(2);
    expect(wrapper.find(BuildControls)).toHaveLength(0);
    expect(wrapper.find(OrderSummary)).toHaveLength(0);
  });

  it("should set state purchasing to true if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    const instance = wrapper.instance();
    expect(instance.state.purchasing).toBeFalsy();
    instance.purchaseHandler();
    expect(instance.state.purchasing).toBeTruthy();
  });

  it("should set state purchasing to false", () => {
    const instance = wrapper.instance();
    instance.setState({ purchasing: true });
    expect(instance.state.purchasing).toBeTruthy();
    instance.purchaseCancelHandler();
    expect(instance.state.purchasing).toBeFalsy();
  });
});
