// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// HOCs
import asyncComponent from "./asyncComponent";
// Components
import Spinner from "../../components/UI/Spinner/Spinner";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("asyncComponent()", () => {
  const initialProps = {};
  // Shallowly render the tested component: Shallow does not render child components
  let Component;
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // Instantiation of asyncComponents
    Component = asyncComponent(() =>
      import("../../components/UI/Spinner/Spinner")
    );
    wrapper = shallow(<Component {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should default 'component' to be null.", () => {
    // Assertion
    expect(wrapper.state().component).toEqual(Spinner);
  });
});
