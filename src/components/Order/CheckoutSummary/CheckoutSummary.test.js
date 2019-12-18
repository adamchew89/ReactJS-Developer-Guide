// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import CheckoutSummary from "./CheckoutSummary";
import Button from "../../UI/Button/Button";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<CheckoutSummary />", () => {
  const initialProps = {
    ingredients: {},
    checkoutCancelled: () => {},
    checkoutContinued: () => {}
  };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<CheckoutSummary {...initialProps} />);
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

  it("should trigger func", () => {
    const mockFnCancel = jest.fn();
    const mockFnContinue = jest.fn();
    wrapper.setProps({
      checkoutCancelled: mockFnCancel,
      checkoutContinued: mockFnContinue
    });
    expect(mockFnCancel).not.toHaveBeenCalled();
    expect(mockFnContinue).not.toHaveBeenCalled();
    wrapper
      .find("[btnType='Danger']")
      .get(0)
      .props.clicked();
    wrapper
      .find("[btnType='Success']")
      .get(0)
      .props.clicked();
    expect(mockFnCancel).toHaveBeenCalledTimes(1);
    expect(mockFnContinue).toHaveBeenCalledTimes(1);
  });
});
