// Libraries
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import Input from "./Input";

// Configures enzyme to adapt to react16 via enzyme-adapter-react-16
configure({ adapter: new Adapter() });
// Overview of test suite
describe("<Input />", () => {
  const initialProps = { changed: () => {} };
  // Shallowly render the tested component: Shallow does not render child components
  let wrapper;
  // Executed set-up method before each individual test case.
  beforeEach(() => {
    // shallow rendering replaces child components with identified placeholders
    wrapper = shallow(<Input {...initialProps} />);
  });
  // Executed post-call method after each individual test case.
  afterEach(() => {
    wrapper = null;
  });
  // Individual test cases
  it("should render a <div /> element with 'Input' class and default <input />.", () => {
    // Assertion
    expect(wrapper.find(".Input")).toHaveLength(1);
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("should render a <input /> element with 'input' elementType.", () => {
    wrapper.setProps({ elementType: "input" });
    expect(wrapper.find("input")).toHaveLength(1);
  });

  it("should render a <textarea /> element with 'input' elementType.", () => {
    wrapper.setProps({ elementType: "textarea" });
    expect(wrapper.find("textarea")).toHaveLength(1);
  });

  it("should render a <select /> element with 'select' elementType with one <option /> element.", () => {
    wrapper.setProps({
      elementType: "select",
      elementConfig: { options: [{ value: "test", displayValue: "Test" }] }
    });
    expect(wrapper.find("select")).toHaveLength(1);
    const target = wrapper.find("option");
    expect(target).toHaveLength(1);
    expect(target.text()).toEqual("Test");
  });

  it("should render a <input /> element with 'Invalid' class.", () => {
    wrapper.setProps({ invalid: true, shouldValidate: true, touched: true });
    expect(wrapper.find(".Invalid")).toHaveLength(1);
  });

  it("should trigger func", () => {
    const mockFnChange = jest.fn();
    wrapper.setProps({ elementType: "input", changed: mockFnChange });
    expect(mockFnChange).not.toHaveBeenCalled();
    wrapper.find("input").simulate("change");
    expect(mockFnChange).toHaveBeenCalledTimes(1);
  });
});
