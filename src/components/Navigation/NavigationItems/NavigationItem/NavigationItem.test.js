// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { NavLink } from "react-router-dom";
// Components
import NavigationItem from "./NavgationItem";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<NavigationItem />", () => {
  const intiialProps = { children: "TEST", link: "test", exact: true };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<NavigationItem {...intiialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render one <NavLink /> element with children.", () => {
    // Assertion
    expect(wrapper.find(NavLink)).toHaveLength(1);
    expect(wrapper.find(NavLink).text()).toEqual("TEST");
  });
});
