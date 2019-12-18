// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import Toolbar from "./Toolbar";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<Toolbar />", () => {
  const initialProps = { drawerToggleClicked: () => {} };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<Toolbar {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render a <DrawerToggle /> element.", () => {
    // Assertion
    expect(wrapper.find(DrawerToggle)).toHaveLength(1);
  });

  it("should trigger func", () => {
    const mockFnToggle = jest.fn();
    wrapper.setProps({ drawerToggleClicked: mockFnToggle });
    expect(mockFnToggle).not.toHaveBeenCalled();
    wrapper.find(DrawerToggle).get(0).props.clicked();
    expect(mockFnToggle).toHaveBeenCalledTimes(1);
  });
});
