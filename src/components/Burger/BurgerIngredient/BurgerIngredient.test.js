// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import BurgerIngredient, * as Ingredient from "./BurgerIngredient";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<BurgerIngredient />", () => {
  const initialProps = { type: Ingredient.CHEESE };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<BurgerIngredient {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render <div class='$type' /> elements.", () => {
    // Assertion
    wrapper.setProps({ type: Ingredient.BREAD_TOP });
    expect(wrapper.find(".BreadTop")).toHaveLength(1);
    wrapper.setProps({ type: Ingredient.BREAD_BOTTOM });
    expect(wrapper.find(".BreadBottom")).toHaveLength(1);
    wrapper.setProps({ type: Ingredient.CHEESE });
    expect(wrapper.find(".Cheese")).toHaveLength(1);
    wrapper.setProps({ type: Ingredient.MEAT });
    expect(wrapper.find(".Meat")).toHaveLength(1);
    wrapper.setProps({ type: Ingredient.BACON });
    expect(wrapper.find(".Bacon")).toHaveLength(1);
    wrapper.setProps({ type: Ingredient.SALAD });
    expect(wrapper.find(".Salad")).toHaveLength(1);
    wrapper.setProps({ type: "UNKNOWN" });
    expect(wrapper.find("div")).toHaveLength(0);
  });
});
