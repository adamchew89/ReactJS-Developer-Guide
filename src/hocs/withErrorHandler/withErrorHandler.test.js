// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// HOCs
import withErrorHandler from "./withErrorHandler";
// Actions
import axios from "../../actions/axios-orders";
// Component
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("withErrorHandler()", () => {
  const initialProps = {};
  // Shallowly render the tested component: Shallow does not render child components
  let HOC;
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // rendering HOCs
    HOC = withErrorHandler(Spinner, axios);
    // // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<HOC {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render a <Modal /> element and an empty <div />.", () => {
    // Assertion
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.find("div").text()).toHaveLength(0);
  });

  it("should render a <Modal /> element and a <div /> containing 'test'.", () => {
    wrapper.setState({ error: { message: "test" } });
    expect(wrapper.find("div").text()).toEqual("test");
  });

  it("should render a <Modal /> element and a an empty <div /> after 'modalClose' has been triggered.", () => {
    wrapper.setState({ error: { message: "test" } });
    expect(wrapper.find("div").text()).toEqual("test");
    wrapper
      .find(Modal)
      .get(0)
      .props.modalClose();
    expect(wrapper.find("div").text()).toHaveLength(0);
  });
});
