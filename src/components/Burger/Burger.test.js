// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import Burger from "./Burger";
import BurgerIngredient, { CHEESE } from "./BurgerIngredient/BurgerIngredient";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });

// Overview of test suite
describe("<Burger />", () => {
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<Burger />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });

  // Individual test cases
  it("should render two <BurgerIngredient /> elements", () => {
    // Assertion
    expect(wrapper.find(BurgerIngredient)).toHaveLength(2);
  });

  it("should render three <BurgerIngredient /> elements when 'CHEESE' is added", () => {
    wrapper.setProps({ ingredients: { [CHEESE]: 1 } });
    expect(wrapper.find(BurgerIngredient)).toHaveLength(3);
  });
});
