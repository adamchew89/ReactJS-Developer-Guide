// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Route } from "react-router-dom";
// Components
import { App } from "./App";
// HOCs
import Layout from "./hocs/Layout/Layout";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<App />", () => {
  const initialProps = { onTryAutoSignIn: () => {} };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<App {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render a <Layout /> element and two <Route /> elements if not authenticated.", () => {
    // Assertion
    expect(wrapper.find(Layout)).toHaveLength(1);
    expect(wrapper.find(Route)).toHaveLength(2);
  });

  it("should render five <Route /> elements if authenticated.", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(Route)).toHaveLength(5);
  });
});
