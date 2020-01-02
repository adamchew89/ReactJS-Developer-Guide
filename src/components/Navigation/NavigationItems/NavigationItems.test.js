// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavgationItem";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });

// Overview of test suite
describe("<NavigationItems />", () => {
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<NavigationItems />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });

  // Individual test cases
  it("should render two <NavigationItem /> elements if not authenticated.", () => {
    // Assertion
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> elements if authenticated.", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
