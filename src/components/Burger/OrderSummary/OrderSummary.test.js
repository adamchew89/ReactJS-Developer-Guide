// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import OrderSummary from "./OrderSummary";
import Button from "../../UI/Button/Button";
import * as Ingredients from "../BurgerIngredient/BurgerIngredient";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<OrderSummary />", () => {
  const initialProps = {
    ingredients: { [Ingredients.CHEESE]: 1, [Ingredients.BACON]: 0 }
  };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<OrderSummary {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render two <Button /> elements.", () => {
    // Assertion
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it("should render a <h3 /> element.", () => {
    // Assertion
    expect(wrapper.find("h3")).toHaveLength(1);
  });
});
