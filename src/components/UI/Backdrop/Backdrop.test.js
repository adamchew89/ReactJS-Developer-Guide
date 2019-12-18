// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import Backdrop from "./Backdrop";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<Backdrop />", () => {
  const initialProps = { clicked: () => {} };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<Backdrop {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render null if show is 'false'.", () => {
    // Assertion
    expect(wrapper.html()).toBeFalsy();
  });

  it("should render <div /> with 'Backdrop' class if show is 'true'.", () => {
    wrapper.setProps({ show: true });
    expect(wrapper.find(".Backdrop")).toHaveLength(1);
  });

  it("should trigger func", () => {
    const mockFn = jest.fn();
    wrapper.setProps({ show: true, clicked: mockFn });
    expect(mockFn).not.toHaveBeenCalled();
    wrapper.find(".Backdrop").simulate("click");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
