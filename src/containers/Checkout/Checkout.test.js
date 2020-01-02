// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Redirect } from "react-router-dom";
// Containers
import { Checkout } from "./Checkout";
// Components
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import * as Ingredients from "../../components/Burger/BurgerIngredient/BurgerIngredient";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<Checkout />", () => {
  const initialProps = {
    location: {},
    history: {},
    match: {},
    ingredients: {}
  };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<Checkout {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render one <Redirect /> element if ingredients are empty.", () => {
    // Assertion
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it("should render one <Redirect /> element if ingredients are present but 'purchase' is true.", () => {
    wrapper.setProps({
      ingredients: { [Ingredients.BACON]: 1 },
      purchased: true
    });
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it("should render one <CheckoutSummary /> element if ingredients are present but 'purchase' is false.", () => {
    wrapper.setProps({
      ingredients: { [Ingredients.BACON]: 1 },
      purchased: false
    });
    expect(wrapper.find(CheckoutSummary)).toHaveLength(1);
  });
});
