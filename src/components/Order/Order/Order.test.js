// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import Order from "./Order";
import * as Ingredients from "../../Burger/BurgerIngredient/BurgerIngredient";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<Order />", () => {
  const initialProps = {};
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<Order {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render two <div /> element with 'Order' class.", () => {
    // Assertion
    expect(wrapper.find(".Order")).toHaveLength(1);
  });

  it("should render a <strong /> element with 'SGD 4.00' text.", () => {
    wrapper.setProps({ totalPrice: 4 });
    expect(wrapper.find("strong").text()).toEqual("SGD 4.00");
  });

  it("should render a <span />  element with 'Ingredient' class and formatted text.", () => {
    wrapper.setProps({ ingredients: { [Ingredients.BACON]: 1 } });
    const target = wrapper.find(".Ingredient");
    expect(target).toHaveLength(1);
    expect(target.text()).toEqual("BACON (1)");
  });
});
