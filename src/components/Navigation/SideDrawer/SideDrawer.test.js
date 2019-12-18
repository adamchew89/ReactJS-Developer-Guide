// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import SideDrawer from "./SideDrawer";
import NavigationItems from "../NavigationItems/NavigationItems";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<SideDrawer />", () => {
  const initialProps = { open: true, closed: () => {} };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<SideDrawer {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render a <NavigationItems /> element. <div /> with class 'Open'.", () => {
    // Assertion
    expect(wrapper.find(NavigationItems)).toHaveLength(1);
    expect(wrapper.find(".Open")).toHaveLength(1);
  });

  it("should render a <div /> with class 'Close' when open is false.", () => {
    wrapper.setProps({ open: false });
    expect(wrapper.find(".Close")).toHaveLength(1);
  });
});
