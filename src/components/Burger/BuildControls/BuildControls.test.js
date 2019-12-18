// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import BuildControls from "./BuildControls";
import BuildControl from "./BuildControl/BuildControl";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<BuildControls />", () => {
  const initialProps = {
    addIngredient: () => {},
    removeIngredient: () => {},
    ordered: () => {}
  };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<BuildControls {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render four <BuildControl /> elements.", () => {
    // Assertion
    expect(wrapper.find(BuildControl)).toHaveLength(4);
  });

  it("should render one <button /> element with 'SIGN IN!' if not authenticated.", () => {
    expect(wrapper.find("button")).toHaveLength(1);
    expect(wrapper.find("button").text()).toEqual("SIGN IN!");
  });

  it("should render one <button /> element with 'ORDER NOW!' if authenticated.", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find("button")).toHaveLength(1);
    expect(wrapper.find("button").text()).toEqual("ORDER NOW!");
  });

  it("should trigger function", () => {
    const mockFnAdded = jest.fn();
    const mockFnRemoved = jest.fn();
    wrapper.setProps({
      addIngredient: mockFnAdded,
      removeIngredient: mockFnRemoved
    });
    expect(mockFnAdded).not.toHaveBeenCalled();
    expect(mockFnRemoved).not.toHaveBeenCalled();
    wrapper
      .find(BuildControl)
      .get(0)
      .props.added();
    wrapper
      .find(BuildControl)
      .get(0)
      .props.removed();
    expect(mockFnAdded).toHaveBeenCalledTimes(1);
    expect(mockFnRemoved).toHaveBeenCalledTimes(1);
  });
});
