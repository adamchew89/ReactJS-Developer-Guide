// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// HOCs
import { Layout } from "./Layout";
// Components
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<Layout />", () => {
  const initialProps = { children: <div>Test</div> };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<Layout {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render a <Toolbar /> and a <SideDrawer /> element.", () => {
    // Assertion
    expect(wrapper.find(Toolbar)).toHaveLength(1);
    expect(wrapper.find(SideDrawer)).toHaveLength(1);
  });

  it("should trigger 'sideDrawerToggleHandler' func and switch 'showSideDrawer' from false to true.", () => {
    expect(wrapper.state().showSideDrawer).toBeFalsy();
    wrapper
      .find(SideDrawer)
      .get(0)
      .props.closed();
    expect(wrapper.state().showSideDrawer).toBeTruthy();
  });
});
