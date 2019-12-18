// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import BuildControl from "./BuildControl";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<BuildControl />", () => {
  const initialProps = { label: "test", added: () => {}, removed: () => {} };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<BuildControl {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render two <button /> elements with 'More' and 'Less'.", () => {
    // Assertion
    const btnLabels = wrapper.find("button").map(button => button.text());
    expect(wrapper.find("button")).toHaveLength(2);
    expect(btnLabels[0]).toEqual("Less");
    expect(btnLabels[1]).toEqual("More");
  });

  it("should trigger function", () => {
    const mockFnRemoved = jest.fn();
    const mockFnAdded = jest.fn();
    wrapper.setProps({ removed: mockFnRemoved, added: mockFnAdded });
    expect(mockFnRemoved).not.toHaveBeenCalled();
    expect(mockFnAdded).not.toHaveBeenCalled();
    wrapper.find(".Less").simulate("click");
    wrapper.find(".More").simulate("click");
    expect(mockFnRemoved).toHaveBeenCalledTimes(1);
    expect(mockFnAdded).toHaveBeenCalledTimes(1);
  });
});
