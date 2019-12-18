// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import DrawerToggle from "./DrawerToggle";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<DrawerToggle />", () => {
  const initialProps = { clicked: () => {} };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<DrawerToggle {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });

  // Individual test cases
  it("should render three child <div /> elements.", () => {
    // Assertion
    expect(wrapper.find("div > div")).toHaveLength(3);
  });

  it("should render a parent <div /> element with 'DrawerToggle' class.", () => {
    expect(wrapper.find(".DrawerToggle")).toHaveLength(1);
  });

  it("should trigger func", () => {
    const mockFnToggle = jest.fn();
    wrapper.setProps({ clicked: mockFnToggle });
    expect(mockFnToggle).not.toHaveBeenCalled();
    wrapper.find(".DrawerToggle").simulate("click");
    expect(mockFnToggle).toHaveBeenCalledTimes(1);
  });
});
