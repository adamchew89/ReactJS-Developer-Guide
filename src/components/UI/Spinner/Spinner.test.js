// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import Spinner from "./Spinner";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<Spinner />", () => {
  const initialProps = {};
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<Spinner {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render a <div /> with 'loader' class and with text 'Loading...'.", () => {
    // Assertion
    expect(wrapper.find(".loader")).toHaveLength(1);
    expect(wrapper.find("div").text()).toEqual("Loading...");
  });
});
