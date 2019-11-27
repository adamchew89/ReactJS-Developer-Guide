// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Containers
import { BurgerBuilder } from "./BurgerBuilder";
// Components
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder />);
  });

  afterEach(() => {
    wrapper = null;
  });

  it("should not render <BuildControls /> without 'ingredients' from state.", () => {
    expect(wrapper.find(BuildControls)).toHaveLength(0);
  });

  it("should render <BuildControls /> when it receives 'ingredients' from state.", () => {
    wrapper.setState({ ingredients: { SALAD: 0 } });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
